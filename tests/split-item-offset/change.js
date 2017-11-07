module.exports = function(plugin, change) {
    const { value } = change;
    const p = value.document.findDescendant(node => node.type == 'paragraph');

    change.collapseToStartOf(p).moveOffsetsTo(5, 5);
    return plugin.changes.splitListItem(change);
};
