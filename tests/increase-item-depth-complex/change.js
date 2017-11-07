export default function(plugin, change) {
    const { value } = change;
    const selectedBlock = value.document.getDescendant('_selection_key');
    change.moveToRangeOf(selectedBlock);

    return plugin.changes.increaseItemDepth(change);
}
