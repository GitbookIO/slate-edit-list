// @flow
import { type Value, type Block, type Range } from 'slate';
import { List } from 'immutable';

import type Options from '../options';
import isList from './isList';
import getCurrentItem from './getCurrentItem';

/**
 * Return the list of items at the given range. The returned items are
 * the highest list item blocks that cover the range.
 *
 * Returns an empty list if no list of items can cover the range
 */
function getItemsAtRange(
    opts: Options,
    value: Value,
    range?: Range
): List<Block> {
    range = range || value.selection;

    if (!range.startKey) {
        return List();
    }

    const { document } = value;

    const startBlock = document.getClosestBlock(range.startKey);
    const endBlock = document.getClosestBlock(range.endKey);

    if (startBlock === endBlock) {
        const item = getCurrentItem(opts, value, startBlock);
        return item ? List([item]) : List();
    }

    const ancestor = document.getCommonAncestor(startBlock.key, endBlock.key);

    if (isList(opts, ancestor)) {
        const startPath = ancestor.getPath(startBlock.key);
        const endPath = ancestor.getPath(endBlock.key);

        return ancestor.nodes.slice(startPath[0], endPath[0] + 1);
    } else if (ancestor.type === opts.typeItem) {
        // The ancestor is the highest list item that covers the range
        return List([ancestor]);
    }
    // No list of items can cover the range
    return List();
}

export default getItemsAtRange;
