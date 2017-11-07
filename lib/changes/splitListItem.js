import getCurrentItem from '../getCurrentItem';

/**
 * Split a list item at the start of the current range.
 *
 * @param  {Object} opts
 * @param  {Slate.Change} change
 * @return {Slate.Change}
 */
function splitListItem(opts, change) {
    const { value } = change;
    const currentItem = getCurrentItem(opts, value);
    const splitOffset = value.startOffset;

    return change.splitDescendantsByKey(
        currentItem.key,
        value.startKey,
        splitOffset
    );
}

module.exports = splitListItem;
