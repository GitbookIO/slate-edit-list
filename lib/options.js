const { Record } = require('immutable');

const DEFAULTS = {
    types: [],
    // The type of the lists
    typeUL: 'ul_list',
    // The type of ordered lists
    typeOL: 'ol_list',
    // The type of list items
    typeItem: 'list_item',
    // The type of default block in items
    typeDefault: 'paragraph'
};

/**
 * The plugin options
 */
class Options extends new Record(DEFAULTS) {}

module.exports = Options;
