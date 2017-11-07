const { Record } = require('immutable');

const DEFAULTS = {
    // The possibles types for list containers
    types: ['ul_list', 'ol_list'],
    // The type of list items
    typeItem: 'list_item',
    // The type of default block in items
    typeDefault: 'paragraph'
};

/**
 * The plugin options
 */
class Options extends (new Record(DEFAULTS)) {}

module.exports = Options;
