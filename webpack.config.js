var webpack = require('webpack');

module.exports = {
  entry: {
    app: './www/assets/js/app.js',
  },
  output: {
    path: __dirname + "www/assets/js/es6/",
    filename: "[name].js"
  },
  devtool: 'inline-source-map',
  module: {
    loaders: [
      {
        test: /\.js/,
        exclude: /node_modules|bower_components/,
        loaders: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
  ]
};