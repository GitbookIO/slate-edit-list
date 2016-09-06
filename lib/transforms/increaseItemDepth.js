const Slate = require('slate');

const getPreviousItem = require('../getPreviousItem');
const getCurrentItem = require('../getCurrentItem');
const getCurrentList = require('../getCurrentList');
const isList = require('../isList');

/**
 * Increase the depth of the current item by putting it in a sub-list
 * of previous item.
 * For first items in a list, does nothing.
 *
 * Also updates selection as fit.
 *
 * @param  {PluginOptions} opts
 * @param  {Slate.Transform} transform
 * @return {Transform} transform
 */
function increaseItemDepth(opts, transform) {
    const previousItem = getPreviousItem(opts, transform.state);

    if (!previousItem) {
        return transform;
    }

    const currentItem = getCurrentItem(opts, transform.state);
    // We will move the selection too
    const prevSelection = transform.state.selection;

    // Remove the item
    transform = transform.removeNodeByKey(currentItem.key);

    // Move it in the sublist of previous item
    transform = addAsSubItem(opts, transform, currentItem, previousItem.key);

    // Update selection
    const newSelection = prevSelection.merge({
        anchorKey: currentItem.key,
        anchorOffset: prevSelection.startOffset,
        focusKey: currentItem.key,
        focusOffset: prevSelection.startOffset, // we collapse the selection
        isBackward: false
    });

    return transform.moveTo(newSelection);
}

/**
 * Append the given item to the list at the end of destination node,
 * creating one if needed.
 *
 * @param {PluginOptions} opts
 * @param {Slate.Transform} transform
 * @param {Slate.Block} item The list item to add
 * @param {String} destKey The key of the destination node
 * @return {Slate.Transform}
 */
function addAsSubItem(opts, transform, item, destKey) {
    const destination = transform.state.document.getDescendant(destKey);

    const lastChild = destination.nodes.last();

    // The potential existing last child list
    const existingList = isList(opts, lastChild) ? lastChild : null;

    if (existingList) {
        return transform.setNodeByKey(existingList, {
            nodes: existingList.nodes.push(item)
        });
    } else {
        const currentList = getCurrentList(opts, transform.state, destination);

        return transform.setNodeByKey(destination, {
            nodes: destination.nodes.push(Slate.Block.create({
                kind: 'block',
                type: currentList.type,
                nodes: [item]
            }))
        });
    }
}

module.exports = increaseItemDepth;
