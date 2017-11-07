const expect = require('expect');

module.exports = function(plugin, change) {
    const { value } = change;
    const selectedBlock = value.document.getDescendant('_selection_key');
    const initial = change.value
        .change({ save: false })
        .moveToRangeOf(selectedBlock).value;
    const toTest = initial.change();

    toTest.call(plugin.changes.decreaseItemDepth).undo();

    // Back to previous cursor position
    expect(toTest.value.startBlock.text).toEqual('Item 1.1');

    return toTest;
};
