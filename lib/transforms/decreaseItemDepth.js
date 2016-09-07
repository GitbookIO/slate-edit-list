const Slate = require('slate');
const getItemDepth = require('../getItemDepth');
const getCurrentItem = require('../getCurrentItem');

/**
 * Decreases the depth of the current item. The following items will
 * be moved as sublist of the decreased item.
 * No-op for root items.
 *
 * @param  {PluginOptions} opts
 * @param  {Slate.Transform} transform
 * @return {Transform} transform
 */
function decreaseItemDepth(opts, transform, ordered) {
    const { state } = transform;
    const { document } = state;

    const depth = getItemDepth(opts, state);
    if (depth == 1) {
        return transform;
    }

    let currentItem = getCurrentItem(opts, state);
    const currentList = document.getParent(currentItem.key);
    const parentItem = document.getParent(currentList.key);
    const parentList = document.getParent(parentItem.key);
    // The items following will be moved as a sublist of currentItem
    const followingItems = currentList.nodes.skipUntil(i => i === currentItem).rest();

    // Remove the item
    if (currentList.nodes.count() === followingItems.count() + 1) {
        // If current list will be emptied, remove the whole list
        transform = transform.removeNodeByKey(currentList.key);
    } else {
        // Just remove the items
        transform = transform.setNodeByKey(currentList.key, {
            nodes: currentList.nodes.takeUntil(i => i === currentItem)
        });
    }

    if (!followingItems.isEmpty()) {
        // Add them as sublist of currentItem
        const sublist = Slate.Block.create({
            kind: 'block',
            type: currentList.type,
            nodes: followingItems
        });
        currentItem = currentItem.merge({
            nodes: currentItem.nodes.push(sublist)
        });
    }

    // Insert the item after parent item
    const afterRemoval = transform.apply();
    let newParentListItems = afterRemoval.document.getDescendant(parentList).nodes;
    newParentListItems = newParentListItems.insert(
        parentList.nodes.indexOf(parentItem) + 1,
        currentItem
    );
    transform = transform.setNodeByKey(parentList.key, {
        nodes: newParentListItems
    });

    return transform;
}

module.exports = decreaseItemDepth;
