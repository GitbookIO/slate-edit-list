const getCurrentItem = require('./getCurrentItem');

/**
 * Get depth of current block in a document list
 *
 * @param {PluginOptions} opts
 * @param {Slate.Value} value
 * @param {Slate.Block} block?
 * @return {Number}
 */
function getItemDepth(opts, value, block) {
    const { document, startBlock } = value;
    block = block || startBlock;

    const currentItem = getCurrentItem(opts, value, block);
    if (!currentItem) {
        return 0;
    }

    const list = document.getParent(currentItem.key);

    return 1 + getItemDepth(opts, value, list);
}

module.exports = getItemDepth;
