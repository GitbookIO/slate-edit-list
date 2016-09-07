
/**
 * Split a new list item.
 *
 * @param  {Object} opts
 * @param  {Transform} transform
 * @return {Transform} transform
 */
function splitListItem(opts, transform) {
    transform = transform.splitBlock();

    // If we were in a nested block
    if (transform.state.startBlock.type !== opts.typeItem) {
        transform = transform.unwrapBlock(opts.typeItem);
        transform = transform.wrapBlock(opts.typeItem);
    }

    return transform;
}

module.exports = splitListItem;
