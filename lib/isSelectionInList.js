const getItemsAtRange = require('./getItemsAtRange');

/**
 * @param {PluginOptions} opts Plugin options
 * @param {Slate.State} state
 * @return {Boolean}  True if selection is inside a list (and can be unwrapped)
 */
function isSelectionInList(opts, state) {
    return !getItemsAtRange(opts, state).isEmpty();
}

module.exports = isSelectionInList;
