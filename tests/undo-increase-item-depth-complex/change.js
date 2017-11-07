const expect = require('expect');

module.exports = function(plugin, change) {
    const { value } = change;
    const selectedBlock = value.document.getDescendant('_selection_key');

    const initial = change.value.change({ save: false }).moveToRangeOf(selectedBlock);
    const initialText = initial.value.startBlock.text;
    const initialSelection = initial.value.selection;

    const newChange = initial.value.change();

    newChange.call(plugin.changes.increaseItemDepth)
          .undo();

    // Back to previous cursor position
    expect(newChange.value.startBlock.text).toEqual(initialText);
    expect(newChange.value.selection.toJS()).toEqual(initialSelection.toJS());

    return newChange;
};
