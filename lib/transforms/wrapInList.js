
/**
 * Wrap the blocks in the current selection in a new list.
 *
 * @param  {PluginOptions} opts
 * @param  {Slate.Transform} transform
 * @param  {Boolean} ordered
 * @return {Transform} transform
 */
function wrapInList(opts, transform, ordered) {
    const { blocks } = transform.state;

    // Wrap in container
    transform.wrapBlock(ordered ? opts.typeOL : opts.typeUL);

    // Wrap in list items
    blocks.forEach(({ key }) => transform.wrapBlockByKey(key, opts.typeItem));

    return transform;
}

module.exports = wrapInList;
