/* eslint-disable import/no-extraneous-dependencies */
import babel from 'rollup-plugin-babel';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import json from 'rollup-plugin-json';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';

/**
 * Return a Rollup configuration for a `pkg` with `env` and `target`.
 *
 * @param {Object} pkg
 * @param {String} env
 * @param {String} format
 * @return {Object}
 */

function configure(pkg, env, target) {
    const isModule = target === 'module';
    const input = `src/index.js`;
    const deps = []
        .concat(pkg.dependencies ? Object.keys(pkg.dependencies) : [])
        .concat(pkg.peerDependencies ? Object.keys(pkg.peerDependencies) : []);

    const plugins = [
        // Allow Rollup to resolve modules from `node_modules`, since it only
        // resolves local modules by default.
        resolve({
            browser: true
        }),

        // Convert JSON imports to ES6 modules.
        json(),

        // Replace `process.env.NODE_ENV` with its value, which enables some modules
        // like React and Slate to use their production variant.
        replace({
            'process.env.NODE_ENV': JSON.stringify(env)
        }),

        // Register Node.js builtins for browserify compatibility.
        builtins(),

        // Use Babel to transpile the result, limiting it to the source code.
        babel({
            include: [`src/**`]
        }),

        // Register Node.js globals for browserify compatibility.
        globals()
    ].filter(Boolean);

    if (isModule) {
        return {
            plugins,
            input,
            output: [
                {
                    file: `${pkg.module}`,
                    format: 'es',
                    sourcemap: true
                },
                {
                    file: `${pkg.main}`,
                    format: 'cjs',
                    exports: 'named',
                    sourcemap: true
                }
            ],
            // We need to explicitly state which modules are external, meaning that
            // they are present at runtime. In the case of non-UMD configs, this means
            // all non-Slate packages.
            external: id =>
                !!deps.find(dep => dep === id || id.startsWith(`${dep}/`))
        };
    }
    return undefined;
}

/**
 * Return a Rollup configuration for a `pkg`.
 *
 * @return {Array}
 */

function factory(pkg) {
    return [configure(pkg, 'development', 'module')].filter(Boolean);
}

/**
 * Export.
 *
 * @type {Function}
 */

export default factory;
