const getItemsAtRange = require('../getItemsAtRange');

/**
 * Unwrap items at range from their list.
 *
 * @param  {PluginOptions} opts
 * @param  {Slate.Change} change
 * @return {Change}
 */
function unwrapList(opts, change) {
    const items = getItemsAtRange(opts, change.value);

    if (items.isEmpty()) {
        return change;
    }

    // Unwrap the items from their list
    items.forEach(item => change.unwrapNodeByKey(item.key));

    // Parent of the list of the items
    const firstItem = items.first();
    const parent = change.value.document.getParent(firstItem.key);

    let index = parent.nodes.findIndex(node => node.key === firstItem.key);

    // Unwrap the items' children
    items.forEach(item => {
        item.nodes.forEach(node => {
            change.moveNodeByKey(node.key, parent.key, index, node, { normalize: false });
            index++;
        });
    });

    // Finally, remove the now empty items
    items.forEach(item => change.removeNodeByKey(item.key));

    return change;
}

module.exports = unwrapList;
