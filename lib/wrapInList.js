
/**
 * Wrap current block
 * @param {Slate.State} state
 * @param {Object} opts
 * @return {Slate.State}
 */
function wrapInList(state, opts) {
    return state
        .transform()
        .wrapBlock(opts.typeUL)
        .wrapBlock(opts.typeItem)
        .apply();
}

module.exports = wrapInList;
