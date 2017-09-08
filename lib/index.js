const Options     = require('./options');
const onEnter     = require('./onEnter');
const onTab       = require('./onTab');
const onBackspace = require('./onBackspace');
const makeSchema  = require('./makeSchema');

const wrapInList        = require('./changes/wrapInList');
const unwrapList        = require('./changes/unwrapList');
const splitListItem     = require('./changes/splitListItem');
const increaseItemDepth = require('./changes/increaseItemDepth');
const decreaseItemDepth = require('./changes/decreaseItemDepth');

const getItemDepth      = require('./getItemDepth');
const isList            = require('./isList');
const isSelectionInList = require('./isSelectionInList');
const getCurrentItem    = require('./getCurrentItem');
const getCurrentList    = require('./getCurrentList');
const getItemsAtRange   = require('./getItemsAtRange');
const getPreviousItem   = require('./getPreviousItem');

const KEY_ENTER     = 'enter';
const KEY_TAB       = 'tab';
const KEY_BACKSPACE = 'backspace';

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
            const { state } = change;

            if (!isSelectionInList(opts, state)) {
                return change;
            }

            return fn(...[opts, change].concat(args));
        };
    }

    /**
     * User is pressing a key in the editor
     */
    function onKeyDown(e, data, change) {
        // Build arguments list
        const args = [e, data, change, opts];

        switch (data.key) {
        case KEY_ENTER:
            return onEnter(...args);
        case KEY_TAB:
            return onTab(...args);
        case KEY_BACKSPACE:
            return onBackspace(...args);
        }
    }

    const schema = makeSchema(opts);

    return {
        onKeyDown,

        schema,

        utils: {
            getCurrentItem:    getCurrentItem.bind(null, opts),
            getCurrentList:    getCurrentList.bind(null, opts),
            getItemDepth:      getItemDepth.bind(null, opts),
            getItemsAtRange:   getItemsAtRange.bind(null, opts),
            getPreviousItem:   getPreviousItem.bind(null, opts),
            isList:            isList.bind(null, opts),
            isSelectionInList: isSelectionInList.bind(null, opts)
        },

        changes: {
            decreaseItemDepth: bindChange(decreaseItemDepth),
            increaseItemDepth: bindChange(increaseItemDepth),
            splitListItem:     bindChange(splitListItem),
            unwrapList:        bindChange(unwrapList),
            wrapInList:        wrapInList.bind(null, opts)
        }
    };
}

module.exports = EditList;
