module.exports = function(plugin, change) {
    const { value } = change;
    const selectedBlock = value.document.getDescendant('_selection_key');
    change.moveToRangeOf(selectedBlock).move(2);

    return plugin.changes.decreaseItemDepth(change);
};
