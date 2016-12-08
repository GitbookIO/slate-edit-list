const unwrapList = require('./transforms/unwrapList');
const getCurrentItem = require('./getCurrentItem');

/**
 * User pressed Delete in an editor
 */
function onBackspace(event, data, state, opts) {
    const { startOffset, selection } = state;

    // Only unwrap...
    // ... with a collapsed selection
    if (selection.isExpanded) return;

    // ... when at the beginning of nodes
    if (startOffset > 0) return;
    // ... in a list
    const currentItem = getCurrentItem(opts, state);
    if (!currentItem) return;
    // ... more precisely at the beginning of the current item
    if (!selection.isAtStartOf(currentItem)) return;

    event.preventDefault();
    return unwrapList(opts, state.transform())
        .apply();
}

module.exports = onBackspace;
