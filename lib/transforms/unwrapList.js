const getCurrentItem = require('../getCurrentItem');

/**
 * Unwrap from list.
 *
 * @param  {PluginOptions} opts
 * @param  {Slate.Transform} transform
 * @return {Transform} transform
 */
function unwrapList(opts, transform) {
    const { state } = transform;
    const currentItem = getCurrentItem(opts, state);
    const itemRange = state.selection.moveToRangeOf(currentItem);

    return transform
        // Unwrap the item from its list
        .unwrapNodeByKey(currentItem.key)
        // Unwrap the item list children
        .unwrapBlockAtRange(itemRange, opts.typeItem);
}

module.exports = unwrapList;
