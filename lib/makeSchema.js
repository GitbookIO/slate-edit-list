const isList = require('./isList');

/**
 * Create a schema for lists
 * @param {PluginOptions} The plugin options
 * @return {Object} A schema definition with rules to normalize lists
 */
function makeSchema(opts) {
    const schema = {
        blocks: {
            [opts.typeItem]: {
                parent: { types: opts.types },
                nodes: [{ kinds: ['block'] }],
                normalize: (change, reason, context) => {
                    if (reason === 'parent_type_invalid') {
                        return change.unwrapBlockByKey(context.node.key, { normalize: false });
                    }

                    if (reason === 'child_kind_invalid') {
                        return wrapChildrenInDefaultBlock(change, opts, context.node);
                    }
                }
            }
        }
    };

    // validate all list types, ensure they only have list item children
    opts.types.forEach((type) => {
        schema.blocks[type] = {
            nodes: [
                { types: [opts.typeItem] }
            ],
            normalize: (change, reason, context) => {
                if (reason === 'child_type_invalid') {
                    return change.wrapBlockByKey(context.child.key, opts.typeItem, { normalize: false });
                }
            }
        };
    });

    return {
        schema,
        validateNode: (node) => {
            return joinAdjacentLists(opts, node);
        }
    };
}

/**
 * Wraps all child nodes of a list item in the default block type.
 * @param {Slate.Change} A change object
 * @param {PluginOptions} The plugin options
 * @return {Slate.Change} A change object, for purposes of chaining
 */
function wrapChildrenInDefaultBlock(change, opts, node) {
    change.wrapBlockByKey(node.nodes.first().key, opts.typeDefault, { normalize: false });

    const wrapper = change.value.document
          .getDescendant(node.key)
          .nodes.first();

    // Add the remaining items
    node.nodes.rest().forEach((child, index) => change.moveNodeByKey(
        child.key,
        wrapper.key,
        index + 1,
        { normalize: false }
    ));

    return change;
}

/**
 * @param {PluginOptions} The plugin options
 * @return {Object} A rule that joins adjacent, same types lists
 */
function joinAdjacentLists(opts, node) {
    if (node.kind !== 'document' && node.kind !== 'block') return;

    const invalids = node.nodes
          .map((child, i) => {
              if (!isList(opts, child)) return;
              const next = node.nodes.get(i + 1);
              if (!next || next.type !== child.type) return;
              return [child, next];
          })
          .filter(Boolean);

    if (invalids.isEmpty()) return;

    /**
     * Join the list pairs
     */
    // We join in reverse order, so that multiple lists folds onto the first one
    return (change) => {
        invalids.reverse().forEach((pair) => {
            const [ first, second ] = pair;
            const updatedSecond = change.value.document.getDescendant(second.key);
            updatedSecond.nodes.forEach((secondNode, index) => {
                change.insertNodeByKey(first.key, first.nodes.size + index, secondNode, {normalize: false});
            });

            change.removeNodeByKey(second.key, {normalize: false});
        });
    };
}

module.exports = makeSchema;
