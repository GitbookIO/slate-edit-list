export default function(plugin, change) {
    const { value } = change;
    const selectedBlock = value.document.getDescendant('_selection_key');
    change.moveToRangeOfNode(selectedBlock);

    return plugin.changes.increaseItemDepth(change);
}
