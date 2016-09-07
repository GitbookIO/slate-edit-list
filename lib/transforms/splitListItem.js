
/**
 * Split a list item.
 *
 * @param  {Object} opts
 * @param  {Transform} transform
 * @return {Transform} transform
 */
function splitListItem(opts, transform) {
    const { state } = transform;

    // Split current block
    transform = transform.splitBlock();

    // Move the new block and all the following to a next item
    const afterSplit = transform.apply();
    // Block resulting from split
    const newBlock = afterSplit.startBlock;
    // Last block in the item. Might be newBlock
    const lastBlock = afterSplit.document.getParent(newBlock).nodes.last();
    const wrapRange = state.selection.moveToRangeOf(newBlock, lastBlock);

    transform = transform.unwrapBlockAtRange(wrapRange, opts.typeItem);
    transform = transform.wrapBlockAtRange(wrapRange, opts.typeItem);

    return transform;
}

module.exports = splitListItem;
