const wrapInList = require('./transforms/wrapInList');
const unwrapInList = require('./transforms/unwrapInList');

/**
 * User pressed Tab in an editor
 */
function onTab(event, data, state, opts, list) {
    const { startOffset, isCollapsed } = state;

    if (!isCollapsed) {
        return;
    }

    // Shift+tab reduce depth
    if (data.isShift) {
        event.preventDefault();

        return unwrapInList(
            opts,
            state.transform())
            .apply();
    }

    // If pressing tab at the begining of the block, we wrap the item in a new list
    if (startOffset === 0) {
        event.preventDefault();

        return wrapInList(
            opts,
            state.transform(),
            list.type === opts.typeOL)
            .apply();
    }
}

module.exports = onTab;
