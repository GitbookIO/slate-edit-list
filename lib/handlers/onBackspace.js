// @flow
import { type Change } from 'slate';

import type Options from '../options';
import { unwrapList } from '../changes';
import { getCurrentItem } from '../utils';

/**
 * User pressed Delete in an editor
 */
function onBackspace(
    event: *,
    change: Change,
    editor: *,
    opts: Options
): void | any {
    const { value } = change;
    const { startOffset, selection } = value;

    // Only unwrap...
    // ... with a collapsed selection
    if (selection.isExpanded) {
        return undefined;
    }

    // ... when at the beginning of nodes
    if (startOffset > 0) {
        return undefined;
    }
    // ... in a list
    const currentItem = getCurrentItem(opts, value);
    if (!currentItem) {
        return undefined;
    }
    // ... more precisely at the beginning of the current item
    if (!selection.isAtStartOf(currentItem)) {
        return undefined;
    }

    event.preventDefault();
    return unwrapList(opts, change);
}

export default onBackspace;
