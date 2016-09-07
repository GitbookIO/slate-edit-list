const unwrapList = require('./transforms/unwrapList');
const splitListItem = require('./transforms/splitListItem');
const decreaseItemDepth = require('./transforms/decreaseItemDepth');
const getCurrentItem = require('./getCurrentItem');
const getItemDepth = require('./getItemDepth');

/**
 * User pressed Enter in an editor
 *
 * Enter in a list item should split the list item
 * Enter in an empty list item should remove it
 * Shift+Enter in a list item should make a new line
 */
function onEnter(event, data, state, opts) {
    const { startBlock } = state;

    if (!getCurrentItem(opts, state)) {
        return null;
    }

    // Pressing Shift+Enter
    // should split block normally
    if (data.isShift) {
        // TODO fix for items containing only text nodes
        return null;
    }

    // Block is empty, we exit the list
    if (startBlock.length === 0) {
        event.preventDefault();

        if (getItemDepth(opts, state) > 1) {
            return decreaseItemDepth(opts, state.transform()).apply();
        } else {
            // Exit list
            return unwrapList(opts, state.transform()).apply();
        }
    }

    // Split list item
    event.preventDefault();
    return splitListItem(opts, state.transform()).apply();
}

module.exports = onEnter;
