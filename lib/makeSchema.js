const Immutable = require('immutable');
const { Set } = Immutable;

/**
 * Create a schema for lists
 * @param {String} opts.typeUL The type of unordered lists
 * @param {String} opts.typeOL The type of ordered lists
 * @param {String} opts.typeItem The type of list items
 * @param {String} opts.typeDefault The type of the default block in list items
 * @return {Object} A schema definition with rules to normalize lists
 */
function makeSchema(opts) {
    return {
        rules: [
            listsContainOnlyItems(opts),
            itemsDescendList(opts),
            // Must be after itemsDescendList
            itemsContainBlocks(opts)
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
    const isList = matchTypes([opts.typeUL, opts.typeOL]);

    return {
        match: isList,

        validate(list) {
            const notItems = list.nodes.filter(n => n.type !== opts.typeItem);

            if (notItems.isEmpty()) {
                // Only valid list items
                return null;
            } else {
                // All the non items
                return {
                    toWrap: notItems
                };
            }
        },

        /**
         * @param {List<Nodes>} value.toWrap Children to wrap in list
         */
        normalize(transform, node, value) {
            return value.toWrap.reduce(
                (tr, node) => tr.wrapBlockByKey(node.key, opts.typeItem),
                transform
            );
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
        match(node) {
            return (node.kind === 'block' || node.kind === 'document')
                && !isList(node);
        },

        validate(block) {
            const listItems = block.nodes.filter(n => n.type === opts.typeItem);

            if (listItems.isEmpty()) {
                // No orphan list items. All good.
                return null;
            } else {
                // Unwrap the orphan list items
                return {
                    toUnwrap: listItems
                };
            }
        },

        /**
         * Unwrap the given blocks
         * @param {List<Nodes>} value.toUnwrap
         */
        normalize(transform, node, value) {
            return value.toUnwrap.reduce(
                (tr, n) => tr.unwrapBlockByKey(n.key),
                transform
            );
        }
    };
}

/**
 * @param {String} opts.typeItem The type of list items
 * @param {String} opts.typeDefault The type of the default block in list items
 * @return {Object} A rule that ensure list items always contain
 * blocks.
 */
function itemsContainBlocks(opts) {
    const isItem = matchTypes([opts.typeItem]);

    return {
        match: isItem,

        validate(item) {
            // Wrap text nodes in default block
            const toWrap = item.nodes.filter(node => node.kind !== 'block');

            return toWrap.isEmpty() ? null : { toWrap };
        },

        /**
         * Wraps the given nodes in a default block
         * @param {List<Nodes>} value.toWrap
         */
        normalize(transform, node, value) {
            return value.toWrap.reduce(
                (tr, n) => tr.wrapBlockByKey(n.key, opts.typeDefault),
                transform
            );
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
