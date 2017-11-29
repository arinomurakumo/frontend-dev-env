const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    app:   './assets/js/app.js',
  },
  output: {
    filename: "[name].js",
    path: path.join(__dirname, '../www/assets/js/bundle/'),
  },
  devtool: "#inline-source-map",
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: ['env']
        }
      }],
    },
    {
      enforce: 'pre',
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'eslint-loader',
    }],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        // remove console.log
        // drop_console: true
      },
    }),
    new webpack.ProvidePlugin({
      // $: 'jquery'
    }),
  ]
};