
module.exports = function(plugin, state) {
    const selectedBlock = state.document.getDescendant('_selection_key');

    const withCursor = state.transform()
        .collapseToStartOf(selectedBlock)
        .moveForward(5)
        .apply();

    const transform = withCursor.transform();
    return plugin.transforms
        .splitListItem(transform)
        .apply();
};
