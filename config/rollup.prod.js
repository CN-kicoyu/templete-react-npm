import serve from 'rollup-plugin-serve'
import baseConf from './rollup.base'
import camelcase from 'camelcase'
import external from 'rollup-plugin-peer-deps-external'

import pkg from '../package.json';

const PKG_NAME = camelcase(pkg.name)
const {plugins, ...reset} = baseConf

const config = {
  ...reset,
  input: 'src/index.jsx',
  plugins: [...plugins, external()],
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
  ]
}

export default config
