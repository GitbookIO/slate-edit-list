// @flow
import { type Value, type Block } from 'slate';

import type Options from '../options';
import getCurrentItem from './getCurrentItem';

/**
 * Get depth of current block in a document list
 */
function getItemDepth(opts: Options, value: Value, block?: Block): number {
    const { document, startBlock } = value;
    block = block || startBlock;

    const currentItem = getCurrentItem(opts, value, block);
    if (!currentItem) {
        return 0;
    }

    const list = document.getParent(currentItem.key);

    return 1 + getItemDepth(opts, value, list);
}

export default getItemDepth;
