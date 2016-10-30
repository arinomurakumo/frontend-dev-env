var webpack = require('webpack');
var path    = require('path');

module.exports = {
  entry: {
    app: '../www/assets/js/app.js',
  },
  output: {
    path: __dirname + "../www/assets/js/bundle/",
    filename: "[name].js"
  },
  devtool: 'inline-source-map',
  resolveLoader: {
    root: path.join(__dirname, "node_modules")
  },
  module: {
    loaders: [
      {
        include: [
          path.resolve(__dirname, "../www/assets/js"),
        ],
        test: /\.js/,
        exclude: /node_modules|bower_components/,
        loaders: ['babel-loader'],
        presets: ['es2015']
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
  ]
};