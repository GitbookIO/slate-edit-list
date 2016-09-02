const expect = require('expect');

module.exports = function(plugin, state) {
    const selectedBlock = state.document.getDescendant('current_item');

    state = state.transform().moveToRangeOf(selectedBlock).apply();

    const previousItem = plugin.utils.getPreviousItem(state);
    expect(previousItem.key).toBe('previous_item');
};
