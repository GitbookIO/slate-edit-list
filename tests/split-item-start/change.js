
module.exports = function(plugin, change) {
    const { value } = change;
    const p = value.document.findDescendant(node => node.type == 'paragraph');

    change.collapseToStartOf(p);
    return change.call(plugin.changes.splitListItem);
};
