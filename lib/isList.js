/**
 * @param {PluginOptions} opts Plugin options
 * @param {Node} node
 * @return {Boolean} true if the node is a UL or OL
 */
function isList(opts, node) {
    return node.type === opts.typeUL
        || node.type === opts.typeOL
        || opts.types.includes(node.type);
}

module.exports = isList;
