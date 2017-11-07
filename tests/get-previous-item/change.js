import expect from 'expect';

module.exports = function(plugin, change) {
    const { value } = change;
    const selectedBlock = value.document.getDescendant('current_item');

    change.moveToRangeOf(selectedBlock);

    const previousItem = plugin.utils.getPreviousItem(change.value);
    expect(previousItem.key).toBe('previous_item');
};
