const expect = require('expect');

module.exports = function(plugin, change) {
    const { value } = change;
    const selectedBlock = value.document.getDescendant('_selection_key');
    const initial = change.value
        .change({ save: false })
        .moveToRangeOf(selectedBlock).value;
    const initialText = initial.startBlock.text;
    const initialSelection = initial.selection;
    const toTest = initial.change();
    toTest.call(plugin.changes.unwrapList).undo();

    // Back to previous cursor position
    expect(toTest.value.startBlock.text).toEqual(initialText);
    expect(toTest.value.selection.toJS()).toEqual(initialSelection.toJS());

    return toTest;
};
