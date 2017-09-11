const expect = require('expect');
const fs = require('fs');
const path = require('path');
const Slate = require('slate');
const readMetadata = require('read-metadata');

const EditList = require('../lib');

describe('slate-edit-list', function() {
    const tests = fs.readdirSync(__dirname);
    const plugin = EditList();

    tests.forEach(function(test, index) {
        if (test[0] === '.' || path.extname(test).length > 0) return;
        it(test, function() {
            const dir = path.resolve(__dirname, test);
            const inputPath = path.resolve(dir, 'input.yaml');
            const input = readMetadata.sync(inputPath);

            const expectedPath = path.resolve(dir, 'expected.yaml');
            let expected;
            if (fs.existsSync(expectedPath)) {
                expected = Slate.State.fromJSON(readMetadata.sync(expectedPath)).toJSON();
            }

            const runChange = require(path.resolve(dir, 'change.js'));
            const stateInput = Slate.State.fromJSON(input);

            const newChange = runChange(plugin, stateInput.change());

            if (expected) {
                const newDocJSon = newChange.state.toJSON();

                expect(newDocJSon).toEqual(expected);
            }
        });
    });
});
