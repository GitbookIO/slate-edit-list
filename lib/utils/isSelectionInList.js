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
    return (
        !items.isEmpty() &&
        // Check the type of the list if needed
        (!type ||
            getListForItem(opts, value, items.first()).get('type') === type)
    );
}

export default isSelectionInList;
