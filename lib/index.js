const onEnter     = require('./onEnter');
const onTab       = require('./onTab');
const onBackspace = require('./onBackspace');
const makeSchema = require('./makeSchema');

const wrapInList        = require('./transforms/wrapInList');
const unwrapList        = require('./transforms/unwrapList');
const splitListItem     = require('./transforms/splitListItem');
const increaseItemDepth = require('./transforms/increaseItemDepth');
const decreaseItemDepth = require('./transforms/decreaseItemDepth');

const getItemDepth      = require('./getItemDepth');
const isList            = require('./isList');
const getCurrentItem    = require('./getCurrentItem');
const getCurrentList    = require('./getCurrentList');
const getPreviousItem   = require('./getPreviousItem');

const KEY_ENTER     = 'enter';
const KEY_TAB       = 'tab';
const KEY_BACKSPACE = 'backspace';


/**
 * A Slate plugin to handle keyboard events in lists.
 * @param {Object} [opts] Options for the plugin
 * @param {String} [opts.typeUL='ul_list'] The type of unordered lists
 * @param {String} [opts.typeOL='ol_list'] The type of ordered lists
 * @param {String} [opts.typeItem='list_item'] The type of list items
 * @param {String} [opts.typeDefault='paragraph'] The type of default block in items
 * @param {Number} [opts.maxDepth=null] Maximum depth of nested lists
 * @return {Object}
 */

function EditList(opts) {
    opts          = opts || {};
    opts.typeUL   = opts.typeUL || 'ul_list';
    opts.typeOL   = opts.typeOL || 'ol_list';
    opts.typeItem = opts.typeItem || 'list_item';
    opts.typeDefault = opts.typeDefault || 'paragraph';

    /**
     * Is the selection in a list
     */
    function isSelectionInList(state) {
        return Boolean(getCurrentItem(opts, state));
    }

    /**
     * Bind a transform to be only applied in list
     */
    function bindTransform(fn) {
        return function(transform, ...args) {
            const { state } = transform;

            if (!isSelectionInList(state)) {
                return transform;
            }

            return fn(...[opts, transform].concat(args));
        };
    }

    /**
     * User is pressing a key in the editor
     */
    function onKeyDown(e, data, state) {
        // Build arguments list
        const args = [e, data, state, opts];

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
            isSelectionInList,
            isList:            isList.bind(null, opts),
            getItemDepth:      getItemDepth.bind(null, opts),
            getCurrentList:    getCurrentList.bind(null, opts),
            getCurrentItem:    getCurrentItem.bind(null, opts),
            getPreviousItem:   getPreviousItem.bind(null, opts)
        },

        transforms: {
            wrapInList:        wrapInList.bind(null, opts),
            unwrapList:        bindTransform(unwrapList),
            increaseItemDepth: bindTransform(increaseItemDepth),
            decreaseItemDepth: bindTransform(decreaseItemDepth),
            splitListItem:     bindTransform(splitListItem)
        }
    };
}

module.exports = EditList;
