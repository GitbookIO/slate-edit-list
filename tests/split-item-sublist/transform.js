
module.exports = function(plugin, state) {
    const selectedBlock = state.document.getDescendant('_selection_key');

    const withCursor = state.transform()
              .collapseToStartOf(selectedBlock)
              .move(2) // It|em 1
              .apply();

    const transform = withCursor.transform();
    return plugin.transforms
        .splitListItem(transform)
        .apply();
};
