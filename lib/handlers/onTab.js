// @flow
import { type Change } from 'slate';

import type Options from '../options';
import { decreaseItemDepth, increaseItemDepth } from '../changes';
import { getCurrentItem } from '../utils';

/**
 * User pressed Tab in an editor.
 * Tab       -> Increase item depth if inside a list item
 * Shift+Tab -> Decrease item depth if inside a list item
 */
function onTab(event: *, change: Change, editor: *, opts: Options): void | any {
    const { value } = change;
    const { isCollapsed } = value;

    if (!isCollapsed || !getCurrentItem(opts, value)) {
        return undefined;
    }

    // Shift+tab reduce depth
    if (event.shiftKey) {
        event.preventDefault();

        return decreaseItemDepth(opts, change);
    }

    // Tab increases depth
    event.preventDefault();

    return increaseItemDepth(opts, change);
}

export default onTab;
