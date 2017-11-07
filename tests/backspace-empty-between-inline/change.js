import expect from 'expect';

export default function(plugin, change) {
    const { value } = change;
    const selectedBlock = value.document.getDescendant('_selection_key');
    change.collapseToStartOf(selectedBlock);

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
    expect(change.value.selection.anchorOffset).toEqual(0);
    expect(change.value.selection.isCollapsed).toBe(true);

    return change;
};
