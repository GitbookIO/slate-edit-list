const getItemsAtRange = require('../getItemsAtRange');

/**
 * Unwrap items at range from their list.
 *
 * @param  {PluginOptions} opts
 * @param  {Slate.Transform} transform
 * @return {Transform} transform
 */
function unwrapList(opts, transform) {
    const items = getItemsAtRange(opts, transform.state);

    if (items.isEmpty()) {
        return transform;
    }

    // Unwrap the items from their list
    items.forEach(item => transform.unwrapNodeByKey(item.key));

    // Parent of the list of the items
    const firstItem = items.first();
    const parent = transform.state.document.getParent(firstItem.key);

    let index = parent.nodes.findIndex(node => node.key === firstItem.key);

    // Unwrap the items' children
    items.forEach(item => {
        item.nodes.forEach(node => {
            transform.moveNodeByKey(node.key, parent.key, index, node, { normalize: false });
            index++;
        });
    });

    // Finally, remove the now empty items
    items.forEach(item => transform.removeNodeByKey(item.key));

    return transform;
}

module.exports = unwrapList;
