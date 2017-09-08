const expect = require('expect');

module.exports = function(plugin, change) {
    const { state } = change;
    const selectedBlock = state.document.getDescendant('_selection_key');
    change.moveToRangeOf(selectedBlock);
    const initialText = change.state.startBlock.text;
    const initialSelection = change.state.selection;

    change.call(plugin.changes.unwrapList).undo();

    // Back to previous cursor position
    expect(change.state.startBlock.text).toEqual(initialText);
    expect(change.state.selection.toJS()).toEqual(initialSelection.toJS());

    return change;
};
