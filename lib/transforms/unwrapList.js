
/**
 * Unwrap from list.
 *
 * @param  {PluginOptions} opts
 * @param  {Slate.Transform} transform
 * @return {Transform} transform
 */
function unwrapList(opts, transform, ordered) {
    return transform
        .unwrapBlock(opts.typeItem)
        .unwrapBlock();
}

module.exports = unwrapList;
