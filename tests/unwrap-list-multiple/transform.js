
module.exports = function(plugin, state) {
    const transform = state.transform();
    return plugin.transforms.unwrapList(transform)
        .apply();
};
