const wrapInList = require('./wrapInList');

/**
 * User pressed Tab in an editor
 */
function onTab(event, data, state, opts) {
    const { startBlock, startOffset, isCollapsed } = state;

    if (!isCollapsed) {
        return;
    }

    // If pressing tab at the end of the block, we rap the item in a new list
    if (startOffset === startBlock.length) {
        event.preventDefault();

        return wrapInList(
            state
                .transform()
                .splitBlock()
                .apply(),
            opts
        );
    }
}

module.exports = onTab;
