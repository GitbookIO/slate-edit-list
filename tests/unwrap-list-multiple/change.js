export default function(plugin, change) {
    console.log('Calling unwrap');
    const result = change.call(plugin.changes.unwrapList);
    console.log('Called unwrap');
    return result;
}
