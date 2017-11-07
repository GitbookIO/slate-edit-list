
module.exports = function(plugin, change) {
    const { value } = change;
    const selectedBlock = value.document.getDescendant('_selection_key');
    return change.moveToRangeOf(selectedBlock).call(plugin.changes.unwrapList);
};
