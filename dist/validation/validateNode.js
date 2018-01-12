'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

require('slate');

var _utils = require('../utils');

/**
 * Create a schema definition with rules to normalize lists
 */
function validateNode(opts) {
    return function (node) {
        return joinAdjacentLists(opts, node);
    };
}

/**
 * A rule that joins adjacent lists of the same type
 */
function joinAdjacentLists(opts, node) {
    if (node.object !== 'document' && node.object !== 'block') {
        return undefined;
    }

    var invalids = node.nodes.map(function (child, i) {
        if (!(0, _utils.isList)(opts, child)) return null;
        var next = node.nodes.get(i + 1);
        if (!next || next.type !== child.type) return null;
        return [child, next];
    }).filter(Boolean);

    if (invalids.isEmpty()) {
        return undefined;
    }

    /**
     * Join the list pairs
     */
    // We join in reverse order, so that multiple lists folds onto the first one
    return function (change) {
        invalids.reverse().forEach(function (pair) {
            var _pair = _slicedToArray(pair, 2),
                first = _pair[0],
                second = _pair[1];

            var updatedSecond = change.value.document.getDescendant(second.key);
            updatedSecond.nodes.forEach(function (secondNode, index) {
                change.insertNodeByKey(first.key, first.nodes.size + index, secondNode, { normalize: false });
            });

            change.removeNodeByKey(second.key, { normalize: false });
        });
    };
}

exports.default = validateNode;