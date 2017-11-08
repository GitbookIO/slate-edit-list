export default function(plugin, change) {
    return change.call(plugin.changes.wrapInList);
}
