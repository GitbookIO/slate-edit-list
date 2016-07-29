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


    /**
     * User is pressing a key in the editor
     */
    function onKeyDown(e, data, state) {
        const { startBlock } = state;

        if (!opts.onlyIn(startBlock)) {
            return;
        }

        switch (data.key) {
        case KEY_ENTER:
            return onEnter(e, data, state);
        case KEY_TAB:
            return onTab(e, data, state);
        case KEY_BACKSPACE:
            return  onBackspace(e, data, state);
        }
    }

    return {
        onKeyDown
    };
}

module.exports = EditList;
