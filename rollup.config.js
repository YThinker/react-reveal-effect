const typescript = require('@rollup/plugin-typescript')
const strip = require('@rollup/plugin-strip')
const commonjs = require('@rollup/plugin-commonjs')
const babel = require('@rollup/plugin-babel')
const terser = require('@rollup/plugin-terser')
const externals = require('rollup-plugin-node-externals')
const dts = require('rollup-plugin-dts').default

const entry = 'src/index.tsx';

const cjsOutDir = 'package/lib';
const esOutDir = 'package/es';
const umdOutDir = 'package/dist';

module.exports.default = [{
    input: entry,
    output: [{
        dir: cjsOutDir,
        format: 'cjs'
    }, {
        dir: esOutDir,
        format: 'es'
    }, {
        name: 'ReactRevealEffect',
        dir: umdOutDir,
        format: 'umd'
    }],
    plugins: [
        externals(),
        commonjs(),
        strip(),
        typescript(),
        babel({
            presets: ["@babel/preset-env"],
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
            exclude: "**/node_modules/**"
        }),
        terser()
    ]
}, {
    input: entry,
    output: [{
        dir: cjsOutDir,
        format: 'cjs'
    }, {
        dir: esOutDir,
        format: 'es'
    }, {
        name: 'ReactRevealEffect',
        dir: umdOutDir,
        format: 'umd'
    }],
    plugins: [dts()]
}];