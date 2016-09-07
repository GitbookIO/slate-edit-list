const getCurrentItem = require('./getCurrentItem');

/**
 * Get depth of current block in a document list
 *
 * @param {PluginOptions} opts
 * @param {Slate.State} state
 * @param {Slate.Block} block?
 * @return {Number}
 */
function getItemDepth(opts, state, block) {
    const { document, startBlock } = state;
    block = block || startBlock;

    const currentItem = getCurrentItem(opts, state, block);
    if (!currentItem) {
        return 0;
    }

    const list = document.getParent(currentItem.key);

    return (1 + getItemDepth(opts, state, list));
}

module.exports = getItemDepth;
