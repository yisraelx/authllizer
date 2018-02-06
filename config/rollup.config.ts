import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import sourceMaps from 'rollup-plugin-sourcemaps';
import typescript from 'rollup-plugin-typescript2';
import minify from 'rollup-plugin-minify';
import * as _ from 'lodash';
import {join} from 'path';

let PKG = require(join(process.cwd(), 'package.json'));

let banner = `/**
* ${PKG.name} (${PKG.homepage})
* @version ${PKG.version}
* @license ${PKG.license}
* @copyright ${PKG.author.name} <${PKG.author.email}> (${PKG.author.url})
*/`;

let globals = _.get(PKG, 'rollup.globals', {});

export default {
    input: `./src/index.ts`,
    output: [
        {
            file: PKG.browser,
            name: `authllizer.${_.camelCase(PKG.name.replace(/@?authllizer[-\/]?/g, ''))}`,
            format: 'umd',
            exports: 'named',
            banner,
            sourcemap: true,
            globals
        }
    ],
    external: _.keys(globals),
    plugins: [
        typescript({
            tsconfigOverride: {
                compilerOptions: {
                    target: 'es5'
                }
            },
            useTsconfigDeclarationDir: true,
            clean: true
        }),
        commonjs(),
        resolve(),
        sourceMaps(),
        minify({umd: PKG.browser.replace('.js', '.min.js')})
    ]
};
