// @flow
import { Record } from 'immutable';

export type OptionsFormat = {
    types?: string[],
    typeItem?: string,
    typeDefault?: string
};

/**
 * The plugin options
 */
class Options extends Record({
    types: ['ul_list', 'ol_list'],
    typeItem: 'list_item',
    typeDefault: 'paragraph'
}) {
    // The possibles types for list containers
    types: string[];
    // The type of list items
    typeItem: string;
    // The type of default block in items
    typeDefault: string;
}

export default Options;
