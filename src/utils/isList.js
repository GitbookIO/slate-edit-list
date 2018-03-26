// @flow
import { type Node } from 'slate';

import type Options from '../options';

/**
 * True if the node is a list container
 */
function isList(opts: Options, node: Node): boolean {
    return opts.types.includes(node.type);
}

export default isList;
