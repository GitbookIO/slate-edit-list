
module.exports = function(plugin, change) {
    const { state } = change;
    const selectedBlock = state.document.getDescendant('_selection_key');
    change.moveToRangeOf(selectedBlock)

    return change.call(plugin.changes.unwrapList);
};
