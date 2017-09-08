const expect = require('expect');

module.exports = function(plugin, change) {
    const { state } = change;
    const selectedBlock = state.document.getDescendant('current_item');

    change.moveToRangeOf(selectedBlock);

    const previousItem = plugin.utils.getPreviousItem(change.state);
    expect(previousItem.key).toBe('previous_item');
};
