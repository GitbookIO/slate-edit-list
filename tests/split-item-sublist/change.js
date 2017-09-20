
module.exports = function(plugin, change) {
    const { state } = change;
    const selectedBlock = state.document.getDescendant('_selection_key');

    change.collapseToStartOf(selectedBlock)
          .move(2); // It|em 1

    return plugin.changes.splitListItem(change);
};
