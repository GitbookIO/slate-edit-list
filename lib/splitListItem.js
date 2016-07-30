
/**
 * Split a new list item
 * @param  {Slate} state
 * @param  {Object} opts
 * @return {State}
 */
function splitListItem(state, opts) {
    return state.transform()
        .splitBlock()
        .unwrapBlock(opts.typeItem)
        .wrapBlock(opts.typeItem)
        .apply();
}

module.exports = splitListItem;
