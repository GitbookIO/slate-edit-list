const getCurrentItem = require('../getCurrentItem');

/**
 * Split a list item.
 *
 * @param  {Object} opts
 * @param  {Transform} transform
 * @return {Transform} transform
 */
function splitListItem(opts, transform) {
    const { state } = transform;
    const currentItem = getCurrentItem(opts, state);
    const splitOffset = currentItem.getOffsetAtRange(state.selection.collapseToStart());
    return transform.splitNodeByKey(currentItem.key, splitOffset);
}

module.exports = splitListItem;
