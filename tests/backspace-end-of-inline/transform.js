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
    return state;
};
