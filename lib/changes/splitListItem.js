const getCurrentItem = require('../getCurrentItem');

/**
 * Split a list item.
 *
 * @param  {Object} opts
 * @param  {Slate.Change} change
 * @return {Slate.Change}
 */
function splitListItem(opts, change) {
    const { state } = change;
    const currentItem = getCurrentItem(opts, state);
    const splitOffset = currentItem.getOffsetAtRange(state.selection.collapseToStart());
    return change.splitNodeByKey(currentItem.key, splitOffset);
}

module.exports = splitListItem;
