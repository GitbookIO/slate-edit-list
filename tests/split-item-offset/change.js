
module.exports = function(plugin, change) {
    const { state } = change;
    const p = state.document.findDescendant(node => node.type == 'paragraph');

    change.collapseToStartOf(p).moveOffsetsTo(5, 5);
    return plugin.changes.splitListItem(change);
};
