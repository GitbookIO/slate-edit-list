const wrapInList = require('./transforms/wrapInList');

/**
 * User pressed Tab in an editor
 */
function onTab(event, data, state, opts, list) {
    const { startBlock, startOffset, isCollapsed } = state;

    if (!isCollapsed) {
        return;
    }

    // If pressing tab at the end of the block, we wrap the item in a new list
    if (startOffset === startBlock.length) {
        event.preventDefault();

        return wrapInList(
            opts,
            state.transform(),
            list.type === opts.typeOL)
            .splitBlock()
            .apply();
    }
}

module.exports = onTab;
