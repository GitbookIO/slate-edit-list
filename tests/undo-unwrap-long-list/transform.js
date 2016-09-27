const expect = require('expect');

module.exports = function(plugin, state) {
    const selectedBlock = state.document.getDescendant('_selection_key');
    state = state.transform().moveToRangeOf(selectedBlock).apply();
    const initialText = state.startBlock.text;
    const initialSelection = state.selection;

    state = plugin.transforms.unwrapList(state.transform()).apply();

    state = state.transform().undo().apply();

    // Back to previous cursor position
    expect(state.startBlock.text).toEqual(initialText);
    expect(state.selection.toJS()).toEqual(initialSelection.toJS());

    return state;
};
