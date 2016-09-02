
/**
 * Return the current list item, from current selection or from a node.
 *
 * @param {PluginOptions} opts
 * @param {Slate.State} state
 * @param {Slate.Block} block?
 * @return {Slate.Block || Void}
 */
function getCurrentItem(opts, state, block) {
    const { document, startBlock } = state;
    block = block || startBlock;

    if (block.type === opts.typeItem) {
        return block;
    } else {
        return document.getClosest(
            block.key,
            n => n.type === opts.typeItem
        );
    }
}

module.exports = getCurrentItem;
