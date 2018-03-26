// @flow
import { Block, type Change } from 'slate';

import type Options from '../options';
import { getItemDepth, getCurrentItem } from '../utils';

/**
 * Decreases the depth of the current item. The following items will
 * be moved as sublist of the decreased item.
 *
 * No-op for root items.
 */
function decreaseItemDepth(opts: Options, change: Change): Change {
    const { value } = change;
    const { document } = value;

    // Cannot decrease item depth of root items
    const depth = getItemDepth(opts, value);
    if (depth == 1) {
        return change;
    }

    const currentItem = getCurrentItem(opts, value);
    if (!currentItem) {
        return change;
    }

    const currentList = document.getParent(currentItem.key);
    const parentItem = document.getParent(currentList.key);
    const parentList = document.getParent(parentItem.key);
    // The items following the item will be moved to a sublist of currentItem
    const followingItems = currentList.nodes
        .skipUntil(i => i === currentItem)
        .rest();

    // True if the currentItem and the followingItems make the whole
    // currentList, and hence the currentList will be emptied
    const willEmptyCurrentList =
        currentList.nodes.size === followingItems.size + 1;

    if (!followingItems.isEmpty()) {
        // Add them as sublist of currentItem
        const sublist = Block.create({
            object: 'block',
            type: currentList.type,
            data: currentList.data
        });
        // Add the sublist
        change.insertNodeByKey(
            currentItem.key,
            currentItem.nodes.size,
            sublist,
            { normalize: false }
        );

        change.moveNodeByKey(
            currentItem.key,
            parentList.key,
            parentList.nodes.indexOf(parentItem) + 1,
            { normalize: false }
        );

        // Move the followingItems to the sublist
        followingItems.forEach((item, index) =>
            change.moveNodeByKey(
                item.key,
                sublist.key,
                sublist.nodes.size + index,
                { normalize: false }
            )
        );
    } else {
        change.moveNodeByKey(
            currentItem.key,
            parentList.key,
            parentList.nodes.indexOf(parentItem) + 1
        );
    }

    // Remove the currentList completely if needed
    if (willEmptyCurrentList) {
        change.removeNodeByKey(currentList.key);
    }

    return change;
}

export default decreaseItemDepth;
