const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const resolve = src => {
  return path.resolve(__dirname, src)
}

module.exports = {
  mode: 'development',
  entry: resolve('index.jsx'),
  output: {
    path: resolve('dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/, resolve('../lib')],
        enforce: 'pre',
        use: [
          {
            loader: 'eslint-loader', // 指定启用eslint-loader
            options: {
              formatter: require('eslint-friendly-formatter'),
              emitWarning: false
            }
          }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.css'],
    alias: {
      '@': path.resolve(__dirname, '../lib')
    }
  },
  performance: {
    hints: 'warning',
    maxAssetSize: 200000,
    maxEntrypointSize: 400000,
    assetFilter(assetFilename) {
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js')
    }
  },
  devtool: 'inline-source-map',
  devServer: {
    proxy: {
      '/api': 'http://localhost:3000'
    },
    host: '127.0.0.1',
    port: 3000,
    compress: true,
    historyApiFallback: true,
    hot: true,
    inline: true,
    open: true,
    noInfo: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'test',
      filename: 'index.html',
      template: resolve("index.html"),
    })
  ]
}
