const expect = require('expect');

module.exports = function(plugin, state) {
    const selectedBlock = state.document.getDescendant('_selection_key');

    state = state.transform()
        .collapseToStartOf(selectedBlock)
        .moveForward(2) // It|em 1
        .apply();
    const initialText = state.startBlock.text;
    const initialSelection = state.selection;

    state = plugin.transforms.splitListItem(state.transform()).apply();

    state = state.transform().undo().apply();

    // Back to previous cursor position
    expect(state.startBlock.text).toEqual(initialText);
    expect(state.selection.toJS()).toEqual(initialSelection.toJS());

    return state;
};
