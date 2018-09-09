import expect from 'expect';

export default function(plugin, change) {
    const { value } = change;
    const selectedBlock = value.document.getDescendant('current_item');

    change.moveToRangeOfNode(selectedBlock);

    const previousItem = plugin.utils.getPreviousItem(change.value);
    expect(previousItem.key).toBe('previous_item');
}
