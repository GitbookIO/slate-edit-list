import expect from 'expect';

export default function(plugin, change) {
    const { value } = change;
    const initialText = value.startBlock.text;
    const initialSelection = value.selection;

    change.call(plugin.changes.wrapInList).undo();

    // Back to previous cursor position
    expect(change.value.startBlock.text).toEqual(initialText);
    expect(change.value.selection.toJS()).toEqual(initialSelection.toJS());

    return change;
};
