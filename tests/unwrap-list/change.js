module.exports = function(plugin, change) {
    return change.call(plugin.changes.unwrapList);
};
