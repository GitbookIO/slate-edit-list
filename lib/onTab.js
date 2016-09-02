const decreaseItemDepth = require('./transforms/decreaseItemDepth');
const increaseItemDepth = require('./transforms/increaseItemDepth');

/**
 * User pressed Tab in an editor
 */
function onTab(event, data, state, opts, list) {
    const { isCollapsed } = state;

    if (!isCollapsed) {
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
