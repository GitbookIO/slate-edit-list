const getItemDepth = require('../getItemDepth');
const getCurrentItem = require('../getCurrentItem');

/**
 * Decreases the depth of the current item into parents list. No-op
 * for root items.
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

    const currentItem = getCurrentItem(opts, state);
    const currentList = document.getParent(currentItem.key);
    const parentItem = document.getParent(currentList.key);
    const parentList = document.getParent(parentItem.key);

    // Remove the current item
    if (currentList.nodes.count() === 1) {
        // If current list will be emptied, remove the whole list
        transform = transform.removeNodeByKey(currentList.key);
    } else {
        // Just remove the item
        transform = transform.removeNodeByKey(currentItem.key);
    }

    // Add after parent item
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
