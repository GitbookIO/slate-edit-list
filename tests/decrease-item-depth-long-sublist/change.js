export default function(plugin, change) {
    const { value } = change;
    const selectedBlock = value.document.getDescendant('_selection_key');
    change.moveToRangeOfNode(selectedBlock).moveForward(2);

    return change.call(plugin.changes.decreaseItemDepth);
}
