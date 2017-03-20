const expect = require('expect');

module.exports = function(plugin, state) {
    const selectedBlock = state.document.getDescendant('_selection_key');

    const withCursor = state.transform()
              .collapseToStartOf(selectedBlock)
              .move(2) // It|em 1
              .apply();

    const transform = withCursor.transform();
    const newState = plugin.transforms
        .splitListItem(transform)
        .apply();

    // check new selection
    const selectedNode = newState.document.getTexts().get(2);

    expect(newState.selection.toJS()).toEqual({
        anchorKey: selectedNode.key,
        anchorOffset: 0,
        focusKey: selectedNode.key,
        focusOffset: 0,
        isBackward: false,
        isFocused: false,
        marks: null
    });

    return newState;
};
