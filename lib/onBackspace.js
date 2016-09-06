const unwrapList = require('./transforms/unwrapList');
const getCurrentItem = require('./getCurrentItem');

/**
 * User pressed Delete in an editor
 */
function onBackspace(event, data, state, opts) {
    const { startOffset } = state;

    if (!getCurrentItem(opts, state)) {
        return;
    }

    if (startOffset > 0) {
        return;
    }

    event.preventDefault();
    return unwrapList(opts, state.transform())
        .apply();
}

module.exports = onBackspace;
