
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

    const item = document.getParent(block.key);
    const list = document.getParent(item.key);

    const isInDocument = document.getChild(list.key);
    if (isInDocument) {
        return 1;
    }

    return (1 + getItemDepth(opts, state, list));
}

module.exports = getItemDepth;
