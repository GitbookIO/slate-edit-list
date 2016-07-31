
/**
 * Wrap current block
 * @param {Slate.State} state
 * @param {Object} opts
 * @return {Slate.State}
 */
function wrapInList(state, listType, opts) {
    return state
        .transform()
        .wrapBlock(listType)
        .wrapBlock(opts.typeItem)
        .apply();
}

module.exports = wrapInList;
