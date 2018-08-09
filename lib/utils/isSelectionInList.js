// @flow
import { type Value } from 'slate';

import type Options from '../options';
import getItemsAtRange from './getItemsAtRange';
import getListForItem from './getListForItem';

/**
 * True if selection is inside a list (and can be unwrapped)
 */
function isSelectionInList(
    opts: Options,
    value: Value,
    type?: string
): boolean {
    const items = getItemsAtRange(opts, value);
    if (type) {
        if (!items.isEmpty()) {
            return (
                getListForItem(opts, value, items.first()).get('type') === type
            );
        }
        return false;
    }
    return !items.isEmpty();
}

export default isSelectionInList;
