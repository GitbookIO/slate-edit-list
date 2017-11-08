import expect from 'expect';

export default function(plugin, change) {
    const { value } = change;
    const selectedBlock = value.document.getDescendant('cursor');

    change.moveToRangeOf(selectedBlock);

    const currentItem = plugin.utils.getCurrentItem(change.value);
    expect(currentItem.key).toBe('current_item');
}
