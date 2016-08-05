
/**
 * Split a new list item.
 *
 * @param  {Object} opts
 * @param  {Transform} transform
 * @return {Transform} transform
 */
function splitListItem(opts, transform) {
    return transform
        .splitBlock()
        .unwrapBlock(opts.typeItem)
        .wrapBlock(opts.typeItem);
}

module.exports = splitListItem;
