import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import webWorkerLoader from "rollup-plugin-web-worker-loader";
import typescript from '@rollup/plugin-typescript';
import { terser } from "rollup-plugin-terser";

const extensions = [
    '.js', '.jsx', '.ts', '.tsx',
];

export default [
    // browser-friendly UMD build
    {
        input: 'src/vosk.ts',
        output: {
            name: 'Vosk',
            dir: 'dist',
            format: 'umd',
        },
        plugins: [
            resolve({ extensions, browser: true }),
            commonjs(),
            webWorkerLoader({
                forceInline: true,
                targetPlatform: 'browser',
              }),
            typescript(),
        ]
    },
    {
        input: 'dist/vosk.js',
        output: {
            name: 'Vosk minified',
            file: 'dist/vosk.min.js',
            format: 'umd',
        },
        plugins: [
            terser({
                keep_classnames: true,
            })
        ]
    },
];
