const expect = require('expect');

module.exports = function(plugin, change) {
    const { state } = change;
    const selectedBlock = state.document.getDescendant('_selection_key');

    change.moveToRangeOf(selectedBlock)
          .call(plugin.changes.decreaseItemDepth)
          .undo();

    // Back to previous cursor position
    expect(change.state.startBlock.text).toEqual('Item 1.1');

    return change;
};
