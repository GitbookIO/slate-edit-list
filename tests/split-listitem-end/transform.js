
module.exports = function(plugin, state) {
    const p = state.document.findDescendant(node => node.type == 'paragraph');

    const withCursor = state.transform()
        .collapseToEndOf(p)
        .apply();

    const transform = withCursor.transform();
    return plugin.transforms
        .splitListItem(transform)
        .apply();
};
