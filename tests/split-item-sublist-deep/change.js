const expect = require('expect');

module.exports = function(plugin, change) {
    const { state } = change;
    const selectedBlock = state.document.getDescendant('_selection_key');

    change.collapseToStartOf(selectedBlock)
          .move(2); // It|em 1

    plugin.changes.splitListItem(change);

    // check new selection
    const selectedNode = change.state.document.getTexts().get(2);

    expect(change.state.selection.toJS()).toEqual({
        anchorKey: selectedNode.key,
        anchorOffset: 0,
        focusKey: selectedNode.key,
        focusOffset: 0,
        isBackward: false,
        isFocused: false,
        marks: null,
        kind: 'selection'
    });

    return change;
};
