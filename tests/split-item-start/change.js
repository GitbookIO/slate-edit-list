export default function(plugin, change) {
    const { value } = change;
    const p = value.document.findDescendant(node => node.type == 'paragraph');

    change.moveToStartOfNode(p);
    return change.call(plugin.changes.splitListItem);
}
