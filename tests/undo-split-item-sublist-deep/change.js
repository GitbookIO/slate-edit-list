// const expect = require('expect');

export default function(plugin, change) {
    const { value } = change;
    const { selection } = value;

    const range = selection.merge({
        anchor: {
            key: '_selection_key',
            offset: 2
        },
        focus: {
            key: '_selection_key',
            offset: 2
        }
    });

    change
        .select(range)
        .call(plugin.changes.splitListItem)
        .undo();

    // TODO fix undo, and test selection
    // Back to previous cursor position
    // expect(value.startBlock.text).toEqual(initialText);
    // expect(value.selection.toJS()).toEqual(initialSelection.toJS());

    return change;
}
