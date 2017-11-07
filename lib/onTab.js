const decreaseItemDepth = require('./changes/decreaseItemDepth');
const increaseItemDepth = require('./changes/increaseItemDepth');
const getCurrentItem = require('./getCurrentItem');

/**
 * User pressed Tab in an editor.
 * Tab       -> Increase item depth if inside a list item
 * Shift+Tab -> Decrease item depth if inside a list item
 */
function onTab(event, change, editor, opts) {
    const { value } = change;
    const { isCollapsed } = value;

    if (!isCollapsed || !getCurrentItem(opts, value)) {
        return;
    }

    // Shift+tab reduce depth
    if (event.shiftKey) {
        event.preventDefault();

        return decreaseItemDepth(
            opts,
            change
        );
    }

    // Tab increases depth
    event.preventDefault();

    return increaseItemDepth(
        opts,
        change
    );
}

module.exports = onTab;
