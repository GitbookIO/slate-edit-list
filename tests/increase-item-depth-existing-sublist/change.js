
module.exports = function(plugin, change) {
    const { state } = change;
    const selectedBlock = state.document.getDescendant('_selection_key');
    change.moveToRangeOf(selectedBlock);

    return plugin.changes.increaseItemDepth(change);
};
