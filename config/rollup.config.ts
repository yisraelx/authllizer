import { join } from 'path';
import resolvePlugin from 'rollup-plugin-node-resolve';
import { terser as terserPlugin } from 'rollup-plugin-terser';
import tsPlugin from 'rollup-plugin-typescript2';

let PKG = require(join(process.cwd(), 'package.json'));

let banner = `/*!
* ${ PKG.name } (${ PKG.homepage })
* @version ${ PKG.version }
* @license ${ PKG.license }
* @copyright ${ PKG.author.name } <${ PKG.author.email }> (${ PKG.author.url })
*/`;

let {rollup: {globals}} = PKG;

let createOutputConfig = (minify = false) => ({
    file: minify ? PKG.browser.replace('.js', '.min.js') : PKG.browser,
    name: PKG.name,
    format: 'umd',
    exports: 'named',
    banner,
    sourcemap: true,
    globals
});

export default {
    input: `./src/index.ts`,
    output: [
        createOutputConfig(),
        createOutputConfig(true)
    ],
    external: Object.keys(globals),
    plugins: [
        resolvePlugin(),
        tsPlugin({
            typescript: require('typescript'),
            tsconfigOverride: {
                compilerOptions: {
                    target: 'es5'
                }
            },
            clean: true
        }),
        terserPlugin({include: /.*\.min\.js$/, sourcemap: true, output: {comments: false}})
    ]
};
