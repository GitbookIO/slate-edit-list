const expect = require('expect');

module.exports = function(plugin, change) {
    const { state } = change;
    const selectedBlock = state.document.getDescendant('_selection_key');
    const initial = change.state.change({ save: false }).moveToRangeOf(selectedBlock).state;
    const initialText = initial.startBlock.text;
    const initialSelection = initial.selection;
    const toTest = initial.change();
    toTest.call(plugin.changes.unwrapList).undo();

    // Back to previous cursor position
    expect(toTest.state.startBlock.text).toEqual(initialText);
    expect(toTest.state.selection.toJS()).toEqual(initialSelection.toJS());

    return toTest;
};
