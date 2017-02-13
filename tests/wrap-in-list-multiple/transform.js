
module.exports = function(plugin, state) {
    const transform = state.transform();
    return plugin.transforms.wrapInList(transform)
        .apply();
};
