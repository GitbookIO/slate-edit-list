
module.exports = function(plugin, state) {
    const transform = state.transform();
    const data = { style: { listStyleType: 'disc' } };
    return plugin.transforms.wrapInList(transform, false, data)
        .apply();
};
