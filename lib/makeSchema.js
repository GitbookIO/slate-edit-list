const isList = require('./isList');

/**
 * Create a schema for lists
 * @param {PluginOptions} The plugin options
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
 * @param {PluginOptions} The plugin options
 * @return {Object} A rule that ensure lists only contain list
 * items, and at least one.
 */
function listsContainOnlyItems(opts) {
    return {
        match: (node) => isList(opts, node),

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
                (tr, { key }) => tr.wrapBlockByKey(key, opts.typeItem),
                transform
            );
        }
    };
}

/**
 * @param {PluginOptions} The plugin options
 * @return {Object} A rule that ensure list items are always children
 * of a list block.
 */
function itemsDescendList(opts) {
    return {
        match(node) {
            return (node.kind === 'block' || node.kind === 'document')
                && !isList(opts, node);
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
 * @param {PluginOptions} The plugin options
 * @return {Object} A rule that ensure list items always contain
 * blocks.
 */
function itemsContainBlocks(opts) {
    return {
        match: (node) => node.type === opts.typeItem,

        validate(item) {
            const shouldWrap = item.nodes.some(node => node.kind !== 'block');

            return shouldWrap || null;
        },

        /**
         * Wraps the children nodes in the default block
         */
        normalize(transform, node, _) {
            const noNorm = { normalize: false };

            transform = transform.wrapBlockByKey(node.nodes.first().key, opts.typeDefault, noNorm);

            const wrapper = transform.state.document
                      .getDescendant(node.key)
                      .nodes.first();

            // Add the remaining items
            return node.nodes.rest().reduce(
                (tr, n, index) => tr.moveNodeByKey(n.key, wrapper.key, index + 1, noNorm),
                transform
            );
        }
    };
}

module.exports = makeSchema;
