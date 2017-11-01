const isList = require('./isList');

/**
 * Return the parent list block for an item block.
 *
 * @param {PluginOptions} opts
 * @param {Slate.Value} value
 * @param {Slate.Block} item
 * @return {Slate.Block || Void}
 */
function getListForItem(opts, value, item) {
    const { document } = value;
    const parent = document.getParent(item.key);
    return (parent && isList(opts, parent))
        ? parent
        : null;
}

module.exports = getListForItem;
