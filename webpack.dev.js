const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  plugins: [new MiniCssExtractPlugin()],

  devServer: {
    static: {
      directory: path.join(__dirname, './src'),
    },
    compress: true,
    port: 9000,
    liveReload: true,
  },
  devtool: false,
});
