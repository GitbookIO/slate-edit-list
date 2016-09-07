
/**
 * Split a new list item.
 *
 * @param  {Object} opts
 * @param  {Transform} transform
 * @return {Transform} transform
 */
function splitListItem(opts, transform) {
    transform = transform.splitBlock();
    transform = transform.unwrapBlock(opts.typeItem);
    transform = transform.wrapBlock(opts.typeItem);

    return transform;
}

module.exports = splitListItem;
