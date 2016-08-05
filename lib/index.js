const onEnter     = require('./onEnter');
const onTab       = require('./onTab');
const onBackspace = require('./onBackspace');

const wrapInList    = require('./transforms/wrapInList');
const unwrapList    = require('./transforms/unwrapList');
const unwrapInList  = require('./transforms/unwrapInList');
const splitListItem = require('./transforms/splitListItem');
const getItemDepth  = require('./getItemDepth');

const KEY_ENTER     = 'enter';
const KEY_TAB       = 'tab';
const KEY_BACKSPACE = 'backspace';


/**
 * A Slate plugin to handle keyboard events in lists.
 * @return {Object}
 */

function EditList(opts) {
    opts          = opts || {};
    opts.typeUL   = opts.typeUL || 'ul_list';
    opts.typeOL   = opts.typeOL || 'ol_list';
    opts.typeItem = opts.typeItem || 'list_item';

    /**
     * Is the selection in a list
     */
    function isSelectionInList(state) {
        const { startBlock } = state;
        const item = state.document.getParent(startBlock.key);
        return (item && item.type === opts.typeItem);
    }

    /**
     * Bind a transform to be only applied in list
     */
    function bindTransform(fn) {
        return function(transform) {
            let { state } = transform;
            let args = [].splice.call(arguments, 0);

            if (!isSelectionInList(state)) {
                return transform;
            }

            return fn.apply(null, [opts].concat(args));
        };
    }

    /**
     * User is pressing a key in the editor
     */
    function onKeyDown(e, data, state) {
        const { startBlock } = state;

        // Verify that we are a child of a list-item
        const item = state.document.getParent(startBlock.key);
        if (!item || item.type !== opts.typeItem) {
            return;
        }

        // Find the current list
        const list = state.document.getParent(item.key);

        // Build arguments list
        const args = [
            e, data, state,
            opts,
            list, item
        ];

        switch (data.key) {
        case KEY_ENTER:
            return onEnter.apply(null, args);
        case KEY_TAB:
            return onTab.apply(null, args);
        case KEY_BACKSPACE:
            return onBackspace.apply(null, args);
        }
    }

    return {
        onKeyDown,

        utils: {
            isSelectionInList,
            getItemDepth: getItemDepth.bind(null, opts)
        },

        transforms: {
            wrapInList:    wrapInList.bind(null, opts),
            unwrapList:    bindTransform(unwrapList),
            unwrapInList:  bindTransform(unwrapInList),
            splitListItem: bindTransform(splitListItem)
        }
    };
}

module.exports = EditList;
