export default function(plugin, change) {
    const data = { style: { listStyleType: 'disc' } };
    return change.call(plugin.changes.wrapInList, false, data);
}
