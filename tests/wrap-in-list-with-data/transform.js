
module.exports = function(plugin, state) {
    const transform = state.transform();
    const data = { style: { listStyleType: 'decimal' } };
    return plugin.transforms.wrapInList(transform, 'ol_list', data)
        .apply();
};
