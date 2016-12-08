const getCurrentItem = require('../getCurrentItem');

/**
 * Unwrap from list.
 *
 * @param  {PluginOptions} opts
 * @param  {Slate.Transform} transform
 * @return {Transform} transform
 */
function unwrapList(opts, transform) {
    const { state } = transform;
    const currentItem = getCurrentItem(opts, state);
    // Unwrap the item from its list
    transform.unwrapNodeByKey(currentItem.key);

    const parent = transform.state.document.getParent(currentItem.key);
    const index = parent.nodes.findIndex(node => node.key === currentItem.key);

    // Unwrap the item list children
    transform.removeNodeByKey(currentItem.key);
    currentItem.nodes.reverse().forEach(node => {
        transform.insertNodeByKey(parent.key, index, node);
    });

    return transform;
}

module.exports = unwrapList;
