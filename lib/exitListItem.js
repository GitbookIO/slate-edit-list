
/**
 * Exit current list item
 * @param  {Slate} state
 * @param  {Object} opts
 * @return {State}
 */
function exitListItem(state, opts) {
    return state.transform()
        .unwrapBlock(opts.typeItem)
        .unwrapBlock()
        .apply();
}

module.exports = exitListItem;
