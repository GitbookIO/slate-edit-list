const Slate = require('slate');
const getCurrentList = require('../getCurrentList');
const getCurrentItem = require('../getCurrentItem');

/**
 * Split a list item.
 *
 * @param  {Object} opts
 * @param  {Transform} transform
 * @return {Transform} transform
 */
function splitListItem(opts, transform) {
    // Split current block
    transform = transform.splitBlock();

    // Now move the new block and all the following to a next item

    const afterSplit = transform.apply();
    // Block resulting from split
    const newBlock = afterSplit.startBlock;
    const currentList = getCurrentList(opts, afterSplit);
    const currentItem = getCurrentItem(opts, afterSplit);
    // newBlock + all the following
    const toMove = currentItem.nodes.skipUntil(n => n == newBlock);

    // Remove them all
    const newCurrentItem = currentItem.merge({
        nodes: currentItem.nodes.takeUntil(n => n == newBlock)
    });
    const currentItemIndex = currentList.nodes.indexOf(currentItem);
    let newListNodes = currentList.nodes.update(currentItemIndex, n => newCurrentItem);

    // Insert them back as new item of the list
    newListNodes = newListNodes.insert(currentItemIndex + 1, Slate.Block.create({
        type: opts.typeItem,
        nodes: toMove
    }));

    // Apply changes
    transform = transform.setNodeByKey(currentList.key, {
        nodes: newListNodes
    });

    // Restore the selection (trashed by setNodeByKey for some reasons...).
    // The selection afterSplit is on the right node, so use it.
    transform = transform.moveTo(afterSplit.selection);

    return transform;
}

module.exports = splitListItem;
