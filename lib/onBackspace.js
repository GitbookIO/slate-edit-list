const unwrapList = require('./changes/unwrapList');
const getCurrentItem = require('./getCurrentItem');

/**
 * User pressed Delete in an editor
 */
function onBackspace(event, change, editor, opts) {
    const { state } = change;
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
    return unwrapList(opts, change);
}

module.exports = onBackspace;
