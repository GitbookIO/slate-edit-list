const getCurrentItem = require('../getCurrentItem');

/**
 * Split a list item at the start of the current range.
 *
 * @param  {Object} opts
 * @param  {Slate.Change} change
 * @return {Slate.Change}
 */
function splitListItem(opts, change) {
    const { state } = change;
    const currentItem = getCurrentItem(opts, state);
    const splitOffset = state.startOffset;

    return change.splitDescendantsByKey(currentItem.key, state.startKey, splitOffset);
}

module.exports = splitListItem;
