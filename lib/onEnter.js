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
    // Pressing Shift+Enter
    // should split block normally
    if (data.isShift) {
        return null;
    }

    const currentItem = getCurrentItem(opts, state);

    // Not in a list
    if (!currentItem) {
        return null;
    }

    event.preventDefault();

    const isEmpty = currentItem.nodes.size <= 1 && currentItem.length === 0;
    if (isEmpty) {
        // Block is empty, we exit the list
        if (getItemDepth(opts, state) > 1) {
            return decreaseItemDepth(opts, state.transform()).apply();
        } else {
            // Exit list
            return unwrapList(opts, state.transform()).apply();
        }
    } else {
        // Split list item
        return splitListItem(opts, state.transform()).apply();
    }

}

module.exports = onEnter;
