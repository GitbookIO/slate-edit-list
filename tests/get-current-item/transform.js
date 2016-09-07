const expect = require('expect');

module.exports = function(plugin, state) {
    const selectedBlock = state.document.getDescendant('cursor');

    state = state.transform().moveToRangeOf(selectedBlock).apply();

    const currentItem = plugin.utils.getCurrentItem(state);
    expect(currentItem.key).toBe('current_item');
};
