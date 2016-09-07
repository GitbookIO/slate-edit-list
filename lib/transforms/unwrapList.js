
/**
 * Unwrap from list.
 *
 * @param  {PluginOptions} opts
 * @param  {Slate.Transform} transform
 * @return {Transform} transform
 */
function unwrapList(opts, transform) {
    return transform
        .unwrapBlock(opts.typeItem)
        .unwrapBlock();
}

module.exports = unwrapList;
