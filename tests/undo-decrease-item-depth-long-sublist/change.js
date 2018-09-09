import expect from 'expect';

export default function(plugin, change) {
    change.call(plugin.changes.decreaseItemDepth).undo();

    // Back to previous cursor position
    expect(change.value.startBlock.text).toEqual('Item 1.1');

    return change;
}
