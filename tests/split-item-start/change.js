
module.exports = function(plugin, change) {
    const { state } = change;
    const p = state.document.findDescendant(node => node.type == 'paragraph');

    change.collapseToStartOf(p);
    return change.call(plugin.changes.splitListItem);
};
