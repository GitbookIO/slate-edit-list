import expect from 'expect';

export default function(plugin, change) {
    plugin.onKeyDown(
        {
            preventDefault: () => {},
            stopPropagation: () => {},
            key: 'Backspace'
        },
        change,
        {}
    );

    // Selection check
    expect(change.value.startBlock.text).toEqual('');
    expect(change.value.selection.anchor.offset).toEqual(0);
    expect(change.value.selection.isCollapsed).toBe(true);

    return change;
}
