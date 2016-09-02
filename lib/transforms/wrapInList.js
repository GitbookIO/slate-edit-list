
/**
 * Wrap the block in a new list.
 *
 * @param  {PluginOptions} opts
 * @param  {Slate.Transform} transform
 * @param  {Boolean} ordered
 * @return {Transform} transform
 */
function wrapInList(opts, transform, ordered) {
    return transform
        .wrapBlock(ordered ? opts.typeOL : opts.typeUL)
        .wrapBlock(opts.typeItem);
}

module.exports = wrapInList;
