var webpack = require('webpack');
var path    = require('path');

module.exports = {
  entry: {
    app:   './assets/js/app.js',
  },
  output: {
    path: __dirname + "../source/assets/js/bundle/",
    filename: "[name].js"
  },
  devtool: 'inline-source-map',
  resolveLoader: {
    root: path.join(__dirname, "node_modules")
  },
  module: {
    loaders: [
      {
        loader: ['babel-loader'],
        include: [
          path.resolve(__dirname, "./assets/js"),
        ],
        test: /\.js/,
        exclude: /node_modules|bower_components/,
        presets: ['es2015'],
        query  : {
          compact: false,
        },
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    // new webpack.ProvidePlugin({
    //   $: "jquery",
    //   jQuery: "jquery",
    //   "window.jQuery": "jquery",
    // }),
  ]
};