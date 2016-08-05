const unwrapList = require('./transforms/unwrapList');
const splitListItem = require('./transforms/splitListItem');

/**
 * User pressed Enter in an editor
 */
function onEnter(event, data, state, opts) {
    const { startBlock } = state;

    // Pressing Shift+Enter
    // should split block normally
    if (data.isShift) {
        return;
    }

    // Block is empty, we exit the list
    if (startBlock.length === 0) {
        event.preventDefault();
        return unwrapList(opts, state.transform())
            .apply();
    }

    // Split list item
    event.preventDefault();
    return splitListItem(opts, state.transform())
        .apply();
}

module.exports = onEnter;
