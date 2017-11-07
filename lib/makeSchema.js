// @flow
import { type Change, type Node } from 'slate';

import isList from './isList';
import type Options from './options';

type Normalizer = Change => any;

/**
 * Create a schema definition with rules to normalize lists
 */
function makeSchema(opts: Options): Object {
    const schema = {
        blocks: {
            [opts.typeItem]: {
                parent: { types: opts.types },
                nodes: [{ kinds: ['block'] }],

                normalize: normalize({
                    parent_type_invalid: (change, context) =>
                        change.unwrapBlockByKey(context.node.key, {
                            normalize: false
                        }),
                    child_kind_invalid: (change, context) =>
                        wrapChildrenInDefaultBlock(opts, change, context.node)
                })
            }
        }
    };

    // validate all list types, ensure they only have list item children
    opts.types.forEach(type => {
        schema.blocks[type] = {
            nodes: [{ types: [opts.typeItem] }],
            normalize: normalize({
                child_type_invalid: (change, context) =>
                    change.wrapBlockByKey(context.child.key, opts.typeItem, {
                        normalize: false
                    })
            })
        };
    });

    return {
        schema,
        validateNode: node => joinAdjacentLists(opts, node)
    };
}

/*
 * Allows to define a normalize function through a keyed collection of functions
 */
function normalize(reasons: { [string]: (Change, context: any) => any }): * {
    return (change, reason, context) => {
        const reasonFn = reasons[reason];
        if (reasonFn) {
            reasonFn(change, context);
        }
    };
}

/**
 * Wraps all child of a node in the default block type.
 * Returns a change, for chaining purposes
 */
function wrapChildrenInDefaultBlock(
    opts: Options,
    change: Change,
    node: Node
): Change {
    change.wrapBlockByKey(node.nodes.first().key, opts.typeDefault, {
        normalize: false
    });

    const wrapper = change.value.document.getDescendant(node.key).nodes.first();

    // Add in the remaining items
    node.nodes.rest().forEach((child, index) =>
        change.moveNodeByKey(child.key, wrapper.key, index + 1, {
            normalize: false
        })
    );

    return change;
}

/**
 * A rule that joins adjacent lists of the same type
 */
function joinAdjacentLists(opts: Options, node: Node): void | Normalizer {
    if (node.kind !== 'document' && node.kind !== 'block') {
        return undefined;
    }

    const invalids = node.nodes
        .map((child, i) => {
            if (!isList(opts, child)) return null;
            const next = node.nodes.get(i + 1);
            if (!next || next.type !== child.type) return null;
            return [child, next];
        })
        .filter(Boolean);

    if (invalids.isEmpty()) {
        return undefined;
    }

    /**
     * Join the list pairs
     */
    // We join in reverse order, so that multiple lists folds onto the first one
    return change => {
        invalids.reverse().forEach(pair => {
            const [first, second] = pair;
            const updatedSecond = change.value.document.getDescendant(
                second.key
            );
            updatedSecond.nodes.forEach((secondNode, index) => {
                change.insertNodeByKey(
                    first.key,
                    first.nodes.size + index,
                    secondNode,
                    { normalize: false }
                );
            });

            change.removeNodeByKey(second.key, { normalize: false });
        });
    };
}

export default makeSchema;
