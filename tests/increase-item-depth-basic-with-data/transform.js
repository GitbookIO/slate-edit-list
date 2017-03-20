
module.exports = function(plugin, state) {
    const selectedBlock = state.document.getDescendant('_selection_key');
    const transform = state.transform();
    state = transform.moveToRangeOf(selectedBlock).apply();

    return plugin.transforms.increaseItemDepth(state.transform())
        .apply();
};
