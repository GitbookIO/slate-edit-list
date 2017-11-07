export default function(plugin, change) {
    const { value } = change;
    const p = value.document.findDescendant(node => node.type == 'paragraph');

    change.collapseToEndOf(p);
    return plugin.changes.splitListItem(change);
};
