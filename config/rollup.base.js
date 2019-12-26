import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import alias from 'rollup-plugin-alias';
import nested from "postcss-nested";
import postcss from 'rollup-plugin-postcss';
import cssnext from "postcss-cssnext";
import cssnano from "cssnano";
import replace from 'rollup-plugin-replace'
import {eslint} from 'rollup-plugin-eslint';

export default {
  experimentalCodeSplitting: true,
  plugins: [
    alias({
      resolve: ['.js', '.jsx'],
      entries: {
        '@': '../lib',
      }
    }),
    json(),
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
    resolve(),
    commonjs(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true
    }),
    terser()
  ]
}
