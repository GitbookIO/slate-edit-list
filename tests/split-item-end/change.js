
module.exports = function(plugin, change) {
    const { state } = change;
    const p = state.document.findDescendant(node => node.type == 'paragraph');

    change.collapseToEndOf(p);
    return plugin.changes.splitListItem(change);
};
