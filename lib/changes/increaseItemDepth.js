const Slate = require('slate');

const getPreviousItem = require('../getPreviousItem');
const getCurrentItem = require('../getCurrentItem');
const getListForItem = require('../getListForItem');
const isList = require('../isList');

/**
 * Increase the depth of the current item by putting it in a sub-list
 * of previous item.
 * For first items in a list, does nothing.
 *
 * @param  {PluginOptions} opts
 * @param  {Slate.Change} change
 * @return {Slate.Change}
 */
function increaseItemDepth(opts, change) {
    const previousItem = getPreviousItem(opts, change.state);

    if (!previousItem) {
        return change;
    }

    const currentItem = getCurrentItem(opts, change.state);

    // Move the item in the sublist of previous item
    return moveAsSubItem(opts, change, currentItem, previousItem.key);
}

/**
 * Move the given item to the list at the end of destination node,
 * creating one if needed.
 *
 * @param {PluginOptions} opts
 * @param {Slate.Change} change
 * @param {Slate.Block} item The list item to add
 * @param {String} destKey The key of the destination node
 * @return {Slate.Change}
 */
function moveAsSubItem(opts, change, item, destKey) {
    const destination = change.state.document.getDescendant(destKey);
    const lastIndex = destination.nodes.size;
    const lastChild = destination.nodes.last();

    // The potential existing last child list
    const existingList = isList(opts, lastChild) ? lastChild : null;

    if (existingList) {
        return change.moveNodeByKey(
            item.key,
            existingList.key,
            existingList.nodes.size // as last item
        );
    } else {
        const currentList = getListForItem(opts, change.state, destination);

        const newSublist = Slate.Block.create({
            kind: 'block',
            type: currentList.type,
            data: currentList.data
        });

        change.insertNodeByKey(
            destKey,
            lastIndex,
            newSublist
        );

        return change.moveNodeByKey(
            item.key,
            newSublist.key,
            0
        );
    }
}

module.exports = increaseItemDepth;
