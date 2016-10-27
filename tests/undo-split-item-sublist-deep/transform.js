const expect = require('expect');

module.exports = function(plugin, state) {
    const { selection } = state;

    const range = selection.merge({
        anchorKey: '_selection_key',
        anchorOffset: 2,
        focusKey: '_selection_key',
        focusOffset: 2
    });

    state = state.transform()
        .moveTo(range)
        .apply();
    const initialText = state.startBlock.text;
    const initialSelection = state.selection;

    state = plugin.transforms
        .splitListItem(state.transform())
        .apply();

    state = state.transform()
        .undo()
        .apply();

    // TODO fix undo, and test selection
    // Back to previous cursor position
    // expect(state.startBlock.text).toEqual(initialText);
    // expect(state.selection.toJS()).toEqual(initialSelection.toJS());

    return state;
};
