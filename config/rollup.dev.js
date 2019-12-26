import serve from 'rollup-plugin-serve'
import baseConf from './rollup.base'
import * as path from 'path'

const resolve = src => path.join(__dirname, src)

const PORT = 3000
const HOST = '127.0.0.1'

const {plugins, ...reset} = baseConf
const config = {
  ...reset,
  input: resolve('../example/index.jsx'),
  output: [
    {
      format: 'cjs',
      file: resolve('../example/dist/bundle.js'),
      exports: 'named',
    }
  ],
  plugins: [...plugins, serve({
    host: HOST,
    port: PORT,
    contentBase: resolve('../example'),
    open: true
  })]
}

export default config
