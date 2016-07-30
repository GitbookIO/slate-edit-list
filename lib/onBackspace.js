const exitListItem = require('./exitListItem');

/**
 * User pressed Delete in an editor
 */
function onBackspace(event, data, state, opts) {
    const { startOffset } = state;

    if (startOffset > 0) {
        return;
    }

    event.preventDefault();
    return exitListItem(state, opts);
}

module.exports = onBackspace;
