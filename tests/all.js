/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import expect from 'expect';
import fs from 'fs';
import path from 'path';
import Slate from 'slate';

import EditList from '../lib';

// Provide the value with
function deserializeValue(plugin, value) {
    const SCHEMA = Slate.Schema.create({
        plugins: [plugin]
    });

    return Slate.Value.fromJSON(
        {
            selection: value.selection,
            document: value.document,
            schema: SCHEMA
        },
        { normalize: false }
    );
}

describe('slate-edit-list', () => {
    const tests = fs.readdirSync(__dirname);

    tests.forEach((test, index) => {
        if (test[0] === '.' || path.extname(test).length > 0) return;
        it(test, () => {
            const plugin = EditList();

            const dir = path.resolve(__dirname, test);
            const input = require(path.resolve(dir, 'input.js')).default;
            const expectedPath = path.resolve(dir, 'expected.js');
            const expected =
                fs.existsSync(expectedPath) && require(expectedPath).default;

            const runChange = require(path.resolve(dir, 'change.js')).default;

            const valueInput = deserializeValue(plugin, input);

            const newChange = runChange(plugin, valueInput.change());

            if (expected) {
                const newDocJSon = newChange.value.toJSON();
                expect(newDocJSon).toEqual(
                    deserializeValue(plugin, expected).toJSON()
                );
            }
        });
    });
});
