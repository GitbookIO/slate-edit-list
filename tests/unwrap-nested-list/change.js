export default function(plugin, change) {
    const { value } = change;
    const selectedBlock = value.document.getDescendant('_selection_key');
    return change.moveToRangeOfNode(selectedBlock).call(plugin.changes.unwrapList);
}
