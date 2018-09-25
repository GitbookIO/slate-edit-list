import expect from 'expect';

export default function(plugin, change) {
    plugin.changes.splitListItem(change);

    // check new selection
    const selectedNode = change.value.document.getTexts().get(2);

    expect(change.value.selection.toJS()).toMatch({
        anchorKey: selectedNode.key,
        anchorOffset: 0,
        focusKey: selectedNode.key,
        focusOffset: 0
    });

    return change;
}
