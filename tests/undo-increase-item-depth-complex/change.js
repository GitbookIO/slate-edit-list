import expect from 'expect';

export default function(plugin, change) {
    const initialText = change.value.startBlock.text;
    const initialSelection = change.value.selection;

    change.call(plugin.changes.increaseItemDepth).undo();

    // Back to previous cursor position
    expect(change.value.startBlock.text).toEqual(initialText);
    expect(change.value.selection.toJS()).toEqual(initialSelection.toJS());

    return change;
}
