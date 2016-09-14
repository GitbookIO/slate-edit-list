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

    // Move the item in the sublist of previous item
    return moveAsSubItem(opts, transform, currentItem, previousItem.key);
}

/**
 * Move the given item to the list at the end of destination node,
 * creating one if needed.
 *
 * @param {PluginOptions} opts
 * @param {Slate.Transform} transform
 * @param {Slate.Block} item The list item to add
 * @param {String} destKey The key of the destination node
 * @return {Slate.Transform}
 */
function moveAsSubItem(opts, transform, item, destKey) {
    const destination = transform.state.document.getDescendant(destKey);
    const lastIndex = destination.nodes.count();
    const lastChild = destination.nodes.last();

    // The potential existing last child list
    const existingList = isList(opts, lastChild) ? lastChild : null;

    if (existingList) {
        return transform.moveNodeByKey(
            item.key,
            existingList.key,
            lastIndex
        );
    } else {
        const currentList = getCurrentList(opts, transform.state, destination);

        const newSublist = Slate.Block.create({
            kind: 'block',
            type: currentList.type
        });

        transform = transform.insertNodeByKey(
            destKey,
            lastIndex,
            newSublist
        );

        return transform.moveNodeByKey(
            item.key,
            newSublist.key,
            0
        );
    }
}

module.exports = increaseItemDepth;
