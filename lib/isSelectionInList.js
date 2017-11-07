import getItemsAtRange from './getItemsAtRange';

/**
 * @param {PluginOptions} opts Plugin options
 * @param {Slate.Value} value
 * @return {Boolean}  True if selection is inside a list (and can be unwrapped)
 */
function isSelectionInList(opts, value) {
    return !getItemsAtRange(opts, value).isEmpty();
}

export default isSelectionInList;
