export default function(plugin, change) {
    const { value } = change;
    const selectedBlock = value.document.getDescendant('_selection_key');

    change.moveToStartOfNode(selectedBlock).moveForward(2); // It|em 1

    return plugin.changes.splitListItem(change);
}
