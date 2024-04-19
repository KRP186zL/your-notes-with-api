const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const path = require('path');
const { optimize } = require('webpack');
module.exports = {
  entry: {
    app: {
      import: './src/app.js',
      dependOn: 'shared',
    },
    vendor: {
      import: './src/vendor.js',
      dependOn: 'shared',
    },

    shared: 'animate.css',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  output: {
    clean: true,
  },
  plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env']],
          },
        },
      },
    ],
  },
};
