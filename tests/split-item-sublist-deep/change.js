import expect from 'expect';

export default function(plugin, change) {
    const { value } = change;
    const selectedBlock = value.document.getDescendant('_selection_key');

    change.moveToStartOfNode(selectedBlock).moveForward(2); // It|em 1

    plugin.changes.splitListItem(change);

    // check new selection
    const selectedNode = change.value.document.getTexts().get(2);

    expect(change.value.selection.toJS()).toEqual({
        anchor: {
            key: selectedNode.key,
            offset: 0
        },
        focus: {
            key: selectedNode.key,
            offset: 0
        },
        isBackward: false,
        isFocused: false,
        marks: null,
        object: 'range'
    });

    return change;
}
