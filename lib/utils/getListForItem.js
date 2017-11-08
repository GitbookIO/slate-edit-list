// @flow
import { type Value, type Block } from 'slate';

import type Options from '../options';
import isList from './isList';

/**
 * Return the parent list block for an item block.
 */
function getListForItem(opts: Options, value: Value, item: Block): ?Block {
    const { document } = value;
    const parent = document.getParent(item.key);
    return parent && isList(opts, parent) ? parent : null;
}

export default getListForItem;
