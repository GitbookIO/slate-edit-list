const unwrapList = require('./changes/unwrapList');
const splitListItem = require('./changes/splitListItem');
const decreaseItemDepth = require('./changes/decreaseItemDepth');
const getCurrentItem = require('./getCurrentItem');
const getItemDepth = require('./getItemDepth');

/**
 * User pressed Enter in an editor
 *
 * Enter in a list item should split the list item
 * Enter in an empty list item should remove it
 * Shift+Enter in a list item should make a new line
 */
function onEnter(event, change, editor, opts) {
    // Pressing Shift+Enter
    // should split block normally
    if (event.shiftKey) {
        return null;
    }

    const { value } = change;
    const currentItem = getCurrentItem(opts, value);

    // Not in a list
    if (!currentItem) {
        return null;
    }

    event.preventDefault();
    if (currentItem.isEmpty) {
        // Block is empty, we exit the list
        if (getItemDepth(opts, value) > 1) {
            return decreaseItemDepth(opts, change);
        } else {
            // Exit list
            return unwrapList(opts, change);
        }
    } else {
        // Split list item
        return splitListItem(opts, change);
    }

}

module.exports = onEnter;
