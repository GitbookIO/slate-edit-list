// @flow
import { type Value } from 'slate';

import type Options from '../options';
import getItemsAtRange from './getItemsAtRange';

/**
 * True if selection is inside a list (and can be unwrapped)
 */
function isSelectionInList(opts: Options, value: Value): boolean {
    return !getItemsAtRange(opts, value).isEmpty();
}

export default isSelectionInList;
