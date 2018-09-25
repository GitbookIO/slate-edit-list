import expect from 'expect';

export default function(plugin, change) {
    plugin.changes.splitListItem(change);

    // check new selection
    const selectedNode = change.value.document.getTexts().get(2);
    const selectedNodePath = change.value.document
        .getPath(selectedNode.key)
        .toJS();

    expect(change.value.selection.toJS()).toMatch({
        object: 'selection',
        anchor: {
            object: 'point',
            offset: 0,
            path: selectedNodePath
        },
        focus: {
            object: 'point',
            offset: 0,
            path: selectedNodePath
        },
        isFocused: true,
        marks: null
    });

    return change;
}
