const expect = require('expect');

module.exports = function(plugin, change) {
    const { state } = change;
    const selectedBlock = state.document.getDescendant('_selection_key');
    const initial = change.state.change({ save: false }).moveToRangeOf(selectedBlock).state;
    const toTest = initial.change();

    toTest.call(plugin.changes.decreaseItemDepth).undo();

    // Back to previous cursor position
    expect(toTest.state.startBlock.text).toEqual('Item 1.1');

    return toTest;
};
