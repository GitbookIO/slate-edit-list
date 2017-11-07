const Slate = require('slate');
const { List } = require('immutable');
const isList = require('../isList');

/**
 * Wrap the blocks in the current selection in a new list. Selected
 * lists are merged together.
 *
 * @param  {PluginOptions} opts
 * @param  {Slate.Change}
 * @param  {String?} type
 * @param  {Object|Data?} [data]
 * @return {Change}
 */
function wrapInList(opts, change, ordered, data) {
    const selectedBlocks = getHighestSelectedBlocks(change.value);
    const type = ordered || opts.types[0];

    // Wrap in container
    change.wrapBlock({
        type,
        data: Slate.Data.create(data)
    });

    // Wrap in list items
    selectedBlocks.forEach((node) => {
        if (isList(opts, node)) {
            // Merge its items with the created list
            node.nodes.forEach(({ key }) => change.unwrapNodeByKey(key));
        } else {
            change.wrapBlockByKey(node.key, opts.typeItem);
        }
    });

    return change;
}

/**
 * @param  {Slate.Value} value
 * @return {List<Block>} The highest list of blocks that cover the
 * current selection
 */
function getHighestSelectedBlocks(value) {
    const range = value.selection;
    const { document } = value;

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
