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
 * TODO: Also update selection as fit
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

    transform = transform.removeNodeByKey(currentItem.key);

    return addAsSubItem(opts, transform, currentItem, previousItem.key);
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
