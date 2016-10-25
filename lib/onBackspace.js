const unwrapList = require('./transforms/unwrapList');
const getCurrentItem = require('./getCurrentItem');

/**
 * User pressed Delete in an editor
 */
function onBackspace(event, data, state, opts) {
    const { startOffset, selection } = state;

    if (
        // Only unwrap when at the begining
        startOffset > 0
        // With a collapsed selection
        || selection.isExpanded
        // In a list
        || !getCurrentItem(opts, state)
    ) {
        return;
    }

    event.preventDefault();
    return unwrapList(opts, state.transform())
        .apply();
}

module.exports = onBackspace;
