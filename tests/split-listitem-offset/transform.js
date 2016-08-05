
module.exports = function(plugin, state) {
    let p = state.document.findDescendant(node => node.type == 'paragraph');

    let withCursor = state.transform()
        .collapseToStartOf(p)
        .moveToOffsets(5, 5)
        .apply();

    let transform = withCursor.transform();
    return plugin.transforms
        .splitListItem(transform)
        .apply();
};
