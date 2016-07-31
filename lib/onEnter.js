const exitListItem = require('./exitListItem');
const splitListItem = require('./splitListItem');

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
        return exitListItem(state, opts);
    }

    // Split list item
    event.preventDefault();
    return splitListItem(state, opts);
}

module.exports = onEnter;
