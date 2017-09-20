
module.exports = function(plugin, change) {
    const { state } = change;
    const selectedBlock = state.document.getDescendant('_selection_key');
    change.collapseToStartOf(selectedBlock).move(2);

    return plugin.changes.decreaseItemDepth(change);
};
