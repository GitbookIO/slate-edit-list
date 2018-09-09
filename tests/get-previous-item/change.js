import expect from 'expect';

export default function(plugin, change) {
    const previousItem = plugin.utils.getPreviousItem(change.value);
    expect(previousItem.key).toBe('previous_item');
}
