const decreaseItemDepth = require('./transforms/decreaseItemDepth');
const increaseItemDepth = require('./transforms/increaseItemDepth');
const getCurrentItem = require('./getCurrentItem');

/**
 * User pressed Tab in an editor.
 * Tab       -> Increase item depth if inside a list item
 * Shift+Tab -> Decrease item depth if inside a list item
 */
function onTab(event, data, state, opts) {
    const { isCollapsed } = state;

    if (!isCollapsed || !getCurrentItem(opts, state)) {
        return;
    }

    // Shift+tab reduce depth
    if (data.isShift) {
        event.preventDefault();

        return decreaseItemDepth(
            opts,
            state.transform()
        ).apply();
    }

    // Tab increases depth
    event.preventDefault();

    return increaseItemDepth(
        opts,
        state.transform()
    ).apply();
}

module.exports = onTab;
