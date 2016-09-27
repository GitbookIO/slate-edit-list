const expect = require('expect');

module.exports = function(plugin, state) {
    const selectedBlock = state.document.getDescendant('_selection_key');
    const transform = state.transform();

    state = transform.moveToRangeOf(selectedBlock).apply();

    state = plugin.transforms.decreaseItemDepth(state.transform()).apply();

    state = state.transform().undo().apply();

    // Back to previous cursor position
    expect(state.startBlock.text).toEqual('Item 1.1');

    return state;
};
