// @flow
import { type Change, type Node } from 'slate';

import type Options from '../options';

/**
 * Create a schema definition with rules to normalize lists
 */
function schema(opts: Options): Object {
    const constructedSchema = {
        blocks: {
            [opts.typeItem]: {
                parent: { types: opts.types },
                nodes: [{ objects: ['block'] }],

                normalize: normalize({
                    parent_type_invalid: (change, context) =>
                        change.unwrapBlockByKey(context.node.key, {
                            normalize: false
                        }),
                    child_object_invalid: (change, context) =>
                        wrapChildrenInDefaultBlock(opts, change, context.node)
                })
            }
        }
    };

    // validate all list types, ensure they only have list item children
    opts.types.forEach(type => {
        constructedSchema.blocks[type] = {
            nodes: [{ types: [opts.typeItem] }],
            normalize: normalize({
                child_type_invalid: (change, context) =>
                    change.wrapBlockByKey(context.child.key, opts.typeItem, {
                        normalize: false
                    })
            })
        };
    });

    return constructedSchema;
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

export default schema;
