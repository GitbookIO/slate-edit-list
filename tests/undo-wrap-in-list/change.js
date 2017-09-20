const expect = require('expect');

module.exports = function(plugin, change) {
    const { state } = change;
    const initialText = state.startBlock.text;
    const initialSelection = state.selection;

    change.call(plugin.changes.wrapInList).undo();

    // Back to previous cursor position
    expect(change.state.startBlock.text).toEqual(initialText);
    expect(change.state.selection.toJS()).toEqual(initialSelection.toJS());

    return change;
};
