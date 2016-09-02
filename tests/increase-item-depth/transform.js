
module.exports = function(plugin, state) {
    console.log('test');
    const selectedBlock = state.document.getDescendant('_selection_key');
    let transform = state.transform();
    state = transform.moveToRangeOf(selectedBlock).apply();

    console.log(state);
    
    return plugin.transforms.increaseItemDepth(state.transform())
        .apply();
};
