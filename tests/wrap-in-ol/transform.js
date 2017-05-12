
module.exports = function(plugin, state) {
    const transform = state.transform();
    return plugin.transforms.wrapInList(transform, 'ol_list')
        .apply();
};
