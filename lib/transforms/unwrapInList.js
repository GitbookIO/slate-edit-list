const getItemDepth = require('../getItemDepth');

/**
 * Unwrap current item into parents list
 *
 * @param  {PluginOptions} opts
 * @param  {Slate.Transform} transform
 * @return {Transform} transform
 */
function unwrapInList(opts, transform, ordered) {
    let depth = getItemDepth(opts, transform.state);

    if (depth == 1) {
        return transform;
    }

    return transform
        .unwrapBlock(opts.typeItem)
        .unwrapBlock()
        .unwrapBlock()
        .wrapBlock(opts.typeItem);
}

module.exports = unwrapInList;
