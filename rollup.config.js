import camelcase from 'camelcase'
import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import external from 'rollup-plugin-peer-deps-external'
import nested from "postcss-nested";
import postcss from 'rollup-plugin-postcss';
import cssnext from "postcss-cssnext";
import cssnano from "cssnano";
import {eslint} from 'rollup-plugin-eslint';

import pkg from './package.json';

const PKG_NAME = camelcase(pkg.name)

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'umd',
      name: PKG_NAME,
      exports: 'named',
    },
    {
      file: pkg.module,
      format: 'es',
    }
  ],
  experimentalCodeSplitting: true,
  plugins: [
    json(),
    commonjs(),
    external(),
    eslint({
      throwOnError: true,
      throwOnWarning: true,
      include: ['src/**/*.{js,jsx}'],
      exclude: ['node_modules/**']
    }),
    postcss({
      extensions: [".scss", ".less", ".css"],
      minimize: true,
      plugins: [nested(), cssnext({ warnForDuplicates: false }), cssnano()],
      extract: `lib/index.css`
    }),
    resolve({
      mainField: ['jsnext', 'main'],
      browser: true,
    }),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true
    }),
    terser()
  ]
}
