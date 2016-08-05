
module.exports = function(plugin, state) {
    let transform = state.transform();
    return plugin.transforms.unwrapList(transform)
        .apply();
};
