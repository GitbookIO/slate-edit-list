
module.exports = function(plugin, state) {
    const transform = state.transform();
    state = plugin.transforms.wrapInList(transform)
        .apply();

    return state;
};
