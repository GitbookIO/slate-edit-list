
module.exports = function(plugin, change) {
    const { state } = change;
    const selectedBlock = state.document.getDescendant('_selection_key');
    return change.moveToRangeOf(selectedBlock).call(plugin.changes.unwrapList);
};
