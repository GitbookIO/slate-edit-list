
module.exports = function(plugin, state) {
    return state
        .transform()
        .call(plugin.transforms.increaseItemDepth)
        .apply();
};
