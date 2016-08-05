
module.exports = function(plugin, state) {
    let p = state.document.findDescendant(node => node.type == 'paragraph');

    let withCursor = state.transform()
        .collapseToStartOf(p)
        .apply();

    let transform = withCursor.transform();
    return plugin.transforms
        .splitListItem(transform)
        .apply();
};
