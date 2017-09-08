const expect = require('expect');

module.exports = function(plugin, change) {
    const { state } = change;
    const selectedBlock = state.document.getDescendant('cursor');

    change.moveToRangeOf(selectedBlock);

    const currentItem = plugin.utils.getCurrentItem(change.state);
    expect(currentItem.key).toBe('current_item');
};
