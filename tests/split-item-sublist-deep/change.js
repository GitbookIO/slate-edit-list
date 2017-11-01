const expect = require('expect');

module.exports = function(plugin, change) {
    const { value } = change;
    const selectedBlock = value.document.getDescendant('_selection_key');

    change.collapseToStartOf(selectedBlock)
          .move(2); // It|em 1

    plugin.changes.splitListItem(change);

    // check new selection
    const selectedNode = change.value.document.getTexts().get(2);

    expect(change.value.selection.toJS()).toEqual({
        anchorKey: selectedNode.key,
        anchorOffset: 0,
        focusKey: selectedNode.key,
        focusOffset: 0,
        isBackward: false,
        isFocused: false,
        marks: null,
        kind: 'range'
    });

    return change;
};
