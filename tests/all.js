const expect = require('expect');
const fs = require('fs');
const path = require('path');
const Slate = require('slate');
const readMetadata = require('read-metadata');

const EditList = require('../lib');

describe('slate-edit-list', function() {
    const tests = fs.readdirSync(__dirname);
    const plugin = EditList();

    tests.forEach(function(test) {
        if (test[0] === '.' || path.extname(test).length > 0) return;

        it(test, function() {
            const dir = path.resolve(__dirname, test);

            const inputPath = path.resolve(dir, 'input.yaml');
            const input = readMetadata.sync(inputPath);

            const expectedPath = path.resolve(dir, 'expected.yaml');
            let expected;
            if (fs.existsSync(expectedPath)) {
                expected = readMetadata.sync(expectedPath);
            }

            const runTransform = require(path.resolve(dir, 'transform.js'));

            const stateInput = Slate.Raw.deserialize(input, { terse: true });

            const newState = runTransform(plugin, stateInput);

            if (expected) {
                const newDocJSon = Slate.Raw.serialize(newState, { terse: true });
                expect(newDocJSon).toEqual(expected);
            }
        });
    });
});
