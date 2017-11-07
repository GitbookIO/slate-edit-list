import getCurrentItem from './getCurrentItem';
import getListForItem from './getListForItem';

/**
 * Return the parent list block, from current selection or from a node (paragraph in a list item).
 *
 * @param {PluginOptions} opts
 * @param {Slate.Value} value
 * @param {Slate.Block} block?
 * @return {Slate.Block || Void}
 */
function getCurrentList(opts, value, block) {
    const item = getCurrentItem(opts, value, block);

    if (!item) {
        return null;
    }

    return getListForItem(opts, value, item);
}

module.exports = getCurrentList;
