import Options from './options';
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
 * @param {Options} [opts] Options for the plugin
 * @return {Object}
 */

function EditList(opts = {}) {
    opts = new Options(opts);

    /**
     * Bind a change to be only applied in list
     */
    function bindChange(fn) {
        return function(change, ...args) {
            const { value } = change;

            if (!isSelectionInList(opts, value)) {
                return change;
            }

            return fn(...[opts, change].concat(args));
        };
    }

    /**
     * User is pressing a key in the editor
     */
    function onKeyDown(event, change, editor) {
        const args = [event, change, editor, opts];

        switch (event.key) {
            case KEY_ENTER:
                return onEnter(...args);
            case KEY_TAB:
                return onTab(...args);
            case KEY_BACKSPACE:
                return onBackspace(...args);
        }
    }

    const { schema, validateNode } = makeSchema(opts);

    return {
        onKeyDown,

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
            decreaseItemDepth: bindChange(decreaseItemDepth),
            increaseItemDepth: bindChange(increaseItemDepth),
            splitListItem: bindChange(splitListItem),
            unwrapList: bindChange(unwrapList),
            wrapInList: wrapInList.bind(null, opts)
        }
    };
}

module.exports = EditList;
