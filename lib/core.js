// @flow
import Options, { type OptionsFormat } from './options';
import { schema, validateNode } from './validation';
import {
    wrapInList,
    unwrapList,
    splitListItem,
    increaseItemDepth,
    decreaseItemDepth
} from './changes';
import {
    getItemDepth,
    isList,
    isSelectionInList,
    getCurrentItem,
    getCurrentList,
    getItemsAtRange,
    getPreviousItem
} from './utils';

/**
 * Returns the core of the plugin, limited to the validation and normalization
 * part of `slate-edit-list`, and utils.
 *
 * Import this directly: `import EditListCore from 'slate-edit-table/lib/core'`
 * if you don't care about behavior/rendering and you
 * are only manipulating `Slate.Values` without rendering them.
 * That way you do not depend on importing `slate-react`.
 */
function core(
    // Options for the plugin
    opts: OptionsFormat = {}
): Object {
    opts = new Options(opts);

    return {
        schema: schema(opts),
        validateNode: validateNode(opts),

        utils: {
            getCurrentItem: getCurrentItem.bind(null, opts),
            getCurrentList: getCurrentList.bind(null, opts),
            getItemDepth: getItemDepth.bind(null, opts),
            getItemsAtRange: getItemsAtRange.bind(null, opts),
            getPreviousItem: getPreviousItem.bind(null, opts),
            isList: isList.bind(null, opts),
            isSelectionInList: isSelectionInList.bind(null, opts)
        },

        changes: {
            decreaseItemDepth: bindAndScopeChange(opts, decreaseItemDepth),
            increaseItemDepth: bindAndScopeChange(opts, increaseItemDepth),
            splitListItem: bindAndScopeChange(opts, splitListItem),
            unwrapList: bindAndScopeChange(opts, unwrapList),
            wrapInList: wrapInList.bind(null, opts)
        }
    };
}

/**
 * Bind a change to given options, and scope it to act only inside a list
 */
function bindAndScopeChange(opts: Options, fn: *): * {
    return (change, ...args) => {
        const { value } = change;

        if (!isSelectionInList(opts, value)) {
            return change;
        }

        // $FlowFixMe
        return fn(...[opts, change].concat(args));
    };
}

export default core;
