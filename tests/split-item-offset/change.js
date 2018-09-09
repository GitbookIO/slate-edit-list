export default function(plugin, change) {
    const { value } = change;
    const p = value.document.findDescendant(node => node.type == 'paragraph');

    change
        .moveToStartOfNode(p)
        .moveAnchorTo(5)
        .moveFocusTo(5);

    return plugin.changes.splitListItem(change);
}
