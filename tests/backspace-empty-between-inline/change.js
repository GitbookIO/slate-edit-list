const expect = require('expect');

module.exports = function(plugin, change) {
    const { state } = change;
    const selectedBlock = state.document.getDescendant('_selection_key');
    change.collapseToStartOf(selectedBlock);

    plugin.onKeyDown(
        {
            preventDefault: () => {},
            stopPropagation: () => {}
        },
        { key: 'backspace' },
        change
    );

    // Selection check
    expect(change.state.startBlock.text).toEqual('');
    expect(change.state.selection.anchorOffset).toEqual(0);
    expect(change.state.selection.isCollapsed).toBe(true);

    return change;
};
