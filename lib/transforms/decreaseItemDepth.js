const getItemDepth = require('../getItemDepth');

/**
 * Decreases the depth of the current item into parents list. No-op
 * for root items.
 *
 * @param  {PluginOptions} opts
 * @param  {Slate.Transform} transform
 * @return {Transform} transform
 */
function decreaseItemDepth(opts, transform, ordered) {
    const depth = getItemDepth(opts, transform.state);

    if (depth == 1) {
        return transform;
    }

    return transform
        .unwrapBlock(opts.typeItem)
        .unwrapBlock()
        .unwrapBlock()
        .wrapBlock(opts.typeItem);
}

module.exports = decreaseItemDepth;
