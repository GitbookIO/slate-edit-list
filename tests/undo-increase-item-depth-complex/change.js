const expect = require('expect');

module.exports = function(plugin, change) {
    const { state } = change;
    const selectedBlock = state.document.getDescendant('_selection_key');

    const initial = change.state.change({ save: false }).moveToRangeOf(selectedBlock);
    const initialText = initial.state.startBlock.text;
    const initialSelection = initial.state.selection;

    const newChange = initial.state.change();

    newChange.call(plugin.changes.increaseItemDepth)
          .undo();

    // Back to previous cursor position
    expect(newChange.state.startBlock.text).toEqual(initialText);
    expect(newChange.state.selection.toJS()).toEqual(initialSelection.toJS());

    return newChange;
};
