import expect from 'expect';

export default function(plugin, change) {
    const currentItem = plugin.utils.getCurrentItem(change.value);
    expect(currentItem.key).toBe('current_item');
}
