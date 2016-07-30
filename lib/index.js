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
    opts = opts || {};
    opts.typeUL = opts.typeUL || 'ul_list';
    opts.typeOL = opts.typeOL || 'ol_list';
    opts.typeItem = opts.typeItem || 'list_item';

    /**
     * User is pressing a key in the editor
     */
    function onKeyDown(e, data, state) {
        const { startBlock } = state;

        // Verify that we are a child of a list-item
        const parent = state.document.getParent(startBlock.key);
        if (parent.type !== opts.typeItem) {
            return;
        }

        switch (data.key) {
        case KEY_ENTER:
            return onEnter(e, data, state, opts);
        case KEY_TAB:
            return onTab(e, data, state, opts);
        case KEY_BACKSPACE:
            return  onBackspace(e, data, state, opts);
        }
    }

    return {
        onKeyDown
    };
}

module.exports = EditList;
