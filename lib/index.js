const onEnter     = require('./onEnter');
const onTab       = require('./onTab');
const onBackspace = require('./onBackspace');

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
        onKeyDown
    };
}

module.exports = EditList;
