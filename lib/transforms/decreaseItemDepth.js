const Block = require('slate/lib/models/block').default;
const getItemDepth = require('../getItemDepth');
const getCurrentItem = require('../getCurrentItem');

/**
 * Decreases the depth of the current item. The following items will
 * be moved as sublist of the decreased item.
 *
 * No-op for root items.
 *
 * @param  {PluginOptions} opts
 * @param  {Slate.Transform} transform
 * @return {Transform} transform
 */
function decreaseItemDepth(opts, transform, ordered) {
    const { state } = transform;
    const { document } = state;

    // Cannot decrease item depth of root items
    const depth = getItemDepth(opts, state);
    if (depth == 1) {
        return transform;
    }

    const currentItem = getCurrentItem(opts, state);
    const currentList = document.getParent(currentItem.key);
    const parentItem = document.getParent(currentList.key);
    const parentList = document.getParent(parentItem.key);
    // The items following the item will be moved to a sublist of currentItem
    const followingItems = currentList.nodes
              .skipUntil(i => i === currentItem)
              .rest();

    // True if the currentItem and the followingItems make the whole
    // currentList, and hence the currentList will be emptied
    const willEmptyCurrentList = currentList.nodes.count() === followingItems.count() + 1;

    if (!followingItems.isEmpty()) {
        // Add them as sublist of currentItem
        const sublist = Block.create({
            kind: 'block',
            type: currentList.type,
            data: currentList.data
        });
        // Add the sublist
        transform = transform.insertNodeByKey(
            currentItem.key, currentItem.nodes.size, sublist, { normalize: false }
        );

        // Move the followingItems to the sublist
        transform = followingItems.reduce((tr, item) => {
            return tr.moveNodeByKey(
                item.key, sublist.key, sublist.nodes.size, { normalize: false }
            );
        }, transform);
    }

    // Move the item after parent item and normalize
    transform = transform.moveNodeByKey(
        currentItem.key, parentList.key, parentList.nodes.indexOf(parentItem) + 1
    );

    // Remove the currentList completely if needed
    if (willEmptyCurrentList) {
        transform = transform.removeNodeByKey(currentList.key);
    }

    return transform;
}

module.exports = decreaseItemDepth;
