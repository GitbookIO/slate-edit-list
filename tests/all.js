import expect from 'expect';
import fs from 'fs';
import path from 'path';
import Slate from 'slate';
import readMetadata from 'read-metadata';

import EditList from '../lib';

describe('slate-edit-list', () => {
    const tests = fs.readdirSync(__dirname);
    const plugin = EditList();

    tests.forEach((test, index) => {
        if (test[0] === '.' || path.extname(test).length > 0) return;
        it(test, () => {
            const dir = path.resolve(__dirname, test);
            const inputPath = path.resolve(dir, 'input.yaml');
            const input = readMetadata.sync(inputPath);

            const expectedPath = path.resolve(dir, 'expected.yaml');
            let expected;
            if (fs.existsSync(expectedPath)) {
                expected = Slate.Value.fromJSON(
                    readMetadata.sync(expectedPath)
                ).toJSON();
            }

            // eslint-disable-next-line
            const runChange = require(path.resolve(dir, 'change.js')).default;
            const valueInput = Slate.Value.fromJSON(input);

            const newChange = runChange(plugin, valueInput.change());

            if (expected) {
                const newDocJSon = newChange.value.toJSON();

                expect(newDocJSon).toEqual(expected);
            }
        });
    });
});
