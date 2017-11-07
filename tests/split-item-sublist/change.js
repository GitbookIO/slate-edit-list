module.exports = function(plugin, change) {
    const { value } = change;
    const selectedBlock = value.document.getDescendant('_selection_key');

    change.collapseToStartOf(selectedBlock).move(2); // It|em 1

    return plugin.changes.splitListItem(change);
};
