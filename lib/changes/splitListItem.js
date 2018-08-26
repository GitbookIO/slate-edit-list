// @flow
import { type Change } from 'slate';

import type Options from '../options';
import { getCurrentItem } from '../utils';

/**
 * Split a list item at the start of the current range.
 */
function splitListItem(opts: Options, change: Change): Change {
    const { value } = change;
    const currentItem = getCurrentItem(opts, value);
    if (!currentItem) {
        return change;
    }

    const { start } = value.selection;
    const splitOffset = start.offset;

    return change.splitDescendantsByKey(
        currentItem.key,
        start.key,
        splitOffset
    );
}

export default splitListItem;
