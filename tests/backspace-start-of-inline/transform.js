const expect = require('expect');

module.exports = function(plugin, state) {
    const selectedBlock = state.document.getDescendant('_selection_key');
    state = state.transform()
        .collapseToStartOf(selectedBlock).apply();

    state = plugin.onKeyDown(
        {
            preventDefault: () => {},
            stopPropagation: () => {}
        },
        { key: 'backspace' },
        state
    );

    // Selection check
    expect(state.startBlock.text).toEqual('Second item');
    expect(state.selection.anchorOffset).toEqual(0);
    expect(state.selection.isCollapsed).toBe(true);
    return state;
};
