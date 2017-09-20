
module.exports = function(plugin, change) {
    const data = { style: { listStyleType: 'decimal' } };
    return change.call(plugin.changes.wrapInList, 'ol_list', data);
};
