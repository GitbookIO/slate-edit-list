const { Set } = require('immutable');
const Slate = require('slate');

/**
 * Create a schema for lists
 * @param {String} opts.typeUL The type of unordered lists
 * @param {String} opts.typeOL The type of ordered lists
 * @param {String} opts.typeItem The type of list items
 * @return {Object} A schema definition with rules to normalize lists
 */
function makeSchema(opts) {
    return {
        rules: [
            listsContainOnlyItems(opts),
            itemsDescendList(opts),
            itemsContainSingleBlock
        ]
    };
}

/**
 * @param {String} opts.typeUL The type of unordered lists
 * @param {String} opts.typeOL The type of ordered lists
 * @param {String} opts.typeItem The type of list items
 * @return {Object} A rule that ensure lists only contain list
 * items, and at least one.
 */
function listsContainOnlyItems(opts) {
    const EMPTY_LIST_ITEM = {
        type: opts.typeItem
    };
    const isList = matchTypes([opts.typeUL, opts.typeOL]);

    return {
        match: isList,

        validate (list) {
            const items = list.nodes.filter(n => n.type === opts.typeItem);

            if (list.nodes.isEmpty() || items.isEmpty()) {
                // No list items
                return {
                    nodes: [EMPTY_LIST_ITEM]
                };
            } else if (list.nodes.size === items.size) {
                // Only valid list items
                return null;
            } else {
                // Keep only list items
                return {
                    nodes: items
                };
            }
        },

        /**
         * Replaces the node's children
         * @param {List<Nodes>} value.nodes
         */
        normalize (transform, node, value) {
            return transform.setNodeByKey(node.key, {
                nodes: value.nodes
            });
        }
    };
}

/**
 * @param {String} opts.typeUL The type of unordered lists
 * @param {String} opts.typeOL The type of ordered lists
 * @param {String} opts.typeItem The type of list items
 * @return {Object} A rule that ensure list items are always children
 * of a list block.
 */
function itemsDescendList(opts) {
    const isList = matchTypes([opts.typeUL, opts.typeOL]);

    return {
        match (node) {
            return (node.kind === 'block' || node.kind === 'document')
                && !isList(node);
        },

        validate (block) {
            const listItems = block.nodes.filter(n => n.type === opts.typeItem);

            if (listItems.isEmpty()) {
                // No orphan list items. All good.
                return null;
            } else {
                // Remove the orphan list items
                return {
                    toRemove: listItems
                };
            }
        },

        /**
         * Removes the given nodes
         * @param {List<Nodes>} value.toRemove
         */
        normalize (transform, node, value) {
            return value.toRemove.reduce(
                (tr, node) => tr.removeNodeByKey(node.key),
                transform
            );
        }
    };
}

/**
 * @param {String} opts.typeItem The type of list items
 * @return {Object} A rule that ensure list items always contains a single block.
 */
function itemsContainSingleBlock(opts) {
    return {
        match: matchTypes([opts.typeItem]),

        validate (node) {
            const firstBlock = node.nodes.find(n => n.kind === 'block');

            if (node.nodes.isEmpty() || firstBlock === null) {
                // No block child, make one
                return {
                    nodes: [new Slate.Text()]
                };
            } else if (node.nodes.size === 1) {
                // Just a block node -> valid
                return null;
            } else {
                // Keep only the first block child
                return {
                    nodes: [firstBlock]
                };
            }
        },

        /**
         * Replaces the node's children
         * @param {List<Nodes>} value.nodes
         */
        normalize (transform, node, value) {
            return transform.setNodeByKey(node.key, {
                nodes: value.nodes
            });
        }
    };
}

/**
 * @param {Array<String>} types
 * @return {Function} A function that returns true for nodes that
 * match one of the given types.
 */
function matchTypes(types) {
    types = new Set(types);

    return (node) => types.some(type => type === node.type);
}

module.exports = makeSchema;
