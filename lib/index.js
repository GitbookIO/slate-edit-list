// @flow
import Options, { type OptionsFormat } from './options';
import { onEnter, onTab, onBackspace } from './handlers';
import core from './core';

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
    const corePlugin = core(opts);

    return {
        ...corePlugin,

        onKeyDown: onKeyDown.bind(null, opts)
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

export default EditList;
