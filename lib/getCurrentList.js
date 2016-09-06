const isList = require('./isList');

/**
 * Return the current list block, from current selection or from a node.
 *
 * @param {PluginOptions} opts
 * @param {Slate.State} state
 * @param {Slate.Block} block?
 * @return {Slate.Block || Void}
 */
function getCurrentList(opts, state, block) {
    const { document, startBlock } = state;
    block = block || startBlock;

    if (isList(opts, block)) {
        return block;
    } else {
        return document.getClosest(
            block.key,
            isList.bind(null, opts)
        );
    }
}

module.exports = getCurrentList;
