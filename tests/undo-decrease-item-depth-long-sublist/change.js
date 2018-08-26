import expect from 'expect';

export default function(plugin, change) {
    const { value } = change;
    const selectedBlock = value.document.getDescendant('_selection_key');
    const initial = change.value
        .change({ save: false })
        .moveToRangeOfNode(selectedBlock).value;
    const toTest = initial.change();

    toTest.call(plugin.changes.decreaseItemDepth).undo();

    // Back to previous cursor position
    expect(toTest.value.startBlock.text).toEqual('Item 1.1');

    return toTest;
}
