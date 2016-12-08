const expect = require('expect');

module.exports = function(plugin, state) {
    const selectedBlock = state.document.getDescendant('_selection_key');
    state = state.transform()
        .collapseToStartOf(selectedBlock).apply();

    const res = plugin.onKeyDown(
        {
            preventDefault: () => {},
            stopPropagation: () => {}
        },
        { key: 'backspace' },
        state
    );

    // Plugin ignore the backspace at end of inline
    expect(res).toBe(undefined);

    return state;
};
