// @flow
import Options, { type OptionsFormat } from './options';
import onEnter from './onEnter';
import onTab from './onTab';
import onBackspace from './onBackspace';
import makeSchema from './makeSchema';

import wrapInList from './changes/wrapInList';
import unwrapList from './changes/unwrapList';
import splitListItem from './changes/splitListItem';
import increaseItemDepth from './changes/increaseItemDepth';
import decreaseItemDepth from './changes/decreaseItemDepth';

import getItemDepth from './getItemDepth';
import isList from './isList';
import isSelectionInList from './isSelectionInList';
import getCurrentItem from './getCurrentItem';
import getCurrentList from './getCurrentList';
import getItemsAtRange from './getItemsAtRange';
import getPreviousItem from './getPreviousItem';

const KEY_ENTER = 'Enter';
const KEY_TAB = 'Tab';
const KEY_BACKSPACE = 'Backspace';

/**
 * A Slate plugin to handle keyboard events in lists.
 */
function EditList(
    // Options for the plugin
    opts: OptionsFormat = {}
): Object {
    opts = new Options(opts);

    const { schema, validateNode } = makeSchema(opts);

    return {
        onKeyDown: onKeyDown.bind(null, opts),

        schema,
        validateNode,

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
 * User is pressing a key in the editor
 */
function onKeyDown(opts: Options, event, change, editor: *): void | any {
    const args = [event, change, editor, opts];

    switch (event.key) {
        case KEY_ENTER:
            return onEnter(...args);
        case KEY_TAB:
            return onTab(...args);
        case KEY_BACKSPACE:
            return onBackspace(...args);
        default:
            return undefined;
    }
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

export default EditList;
