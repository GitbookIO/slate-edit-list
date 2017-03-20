const Slate = require('slate');
const { List } = require('immutable');
const isList = require('../isList');

/**
 * Wrap the blocks in the current selection in a new list. Selected
 * lists are merged together.
 *
 * @param  {PluginOptions} opts
 * @param  {Slate.Transform} transform
 * @param  {Boolean} [ordered=false]
 * @param  {Object|Data} [data]
 * @return {Transform} transform
 */
function wrapInList(opts, transform, ordered, data) {
    const selectedBlocks = getHighestSelectedBlocks(transform.state);

    // Wrap in container
    transform.wrapBlock({
        type: ordered ? opts.typeOL : opts.typeUL,
        data: Slate.Data.create(data)
    });

    // Wrap in list items
    selectedBlocks.forEach((node) => {
        if (isList(opts, node)) {
            // Merge its items with the created list
            node.nodes.forEach(({ key }) => transform.unwrapNodeByKey(key));
        } else {
            transform.wrapBlockByKey(node.key, opts.typeItem);
        }
    });

    return transform;
}

/**
 * @param  {Slate.State} state
 * @return {List<Block>} The highest list of blocks that cover the
 * current selection
 */
function getHighestSelectedBlocks(state) {
    const range = state.selection;
    const { document } = state;

    const startBlock = document.getClosestBlock(range.startKey);
    const endBlock = document.getClosestBlock(range.endKey);

    if (startBlock === endBlock) {
        return List([startBlock]);
    } else {
        const ancestor = document.getCommonAncestor(startBlock.key, endBlock.key);
        const startPath = ancestor.getPath(startBlock.key);
        const endPath = ancestor.getPath(endBlock.key);

        return ancestor.nodes.slice(startPath[0], endPath[0] + 1);
    }
}

module.exports = wrapInList;
