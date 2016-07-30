const exitListItem = require('./exitListItem');
const splitListItem = require('./splitListItem');

/**
 * User pressed Enter in an editor
 */
function onEnter(event, data, state, opts) {
    const { startBlock } = state;

    // Block is empty, we exit the list
    if (startBlock.length === 0) {
        return exitListItem(state, opts);
    }

    // Pressing Command+Enter or Ctrl+Enter
    // should split block normally
    if (data.isMod) {
        return;
    }

    // Split list item
    return splitListItem(state, opts);
}

module.exports = onEnter;
