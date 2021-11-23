const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts')
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: 'production',
  entry: {
    app: './assets/js/app.js',
    style: './assets/sass/style.scss',
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, '../www/assets/bundle/'),
  },
  devServer: {
    static: {
      directory: path.join(__dirname, '../www'),
    },
    liveReload: true,
    compress: true,
    port: 8080,
    open: true,
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      },],
    },
    {
      test: /\.(sa|sc)ss$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            url: false,
          },
        },
        {
          loader: 'sass-loader',
        },
      ],
    },
    {
      test: /\.css$/i,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [
                []
              ],
            },
          },
        },
      ],
    },
    ],
  },
  plugins: [
    new RemoveEmptyScriptsPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../www/index.html'),
    }),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
        },
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
    splitChunks: {
      name: 'vendor',
      chunks: 'initial',
      cacheGroups: {
        // 今回はvendorだが、任意の名前で問題ない
        vendor: {
          // node_modules配下のモジュールをバンドル対象とする
          test: /node_modules/,
          name: 'vendor',
          chunks: 'initial',
          enforce: true,
        },
        vendorModules: {
          // 今回はsrc/js/modules配下にバンドルしたいモジュールが存在するため指定は以下になる
          test: /src\/js\/modules/,
          name: 'vendor-modules',
          chunks: 'initial',
          enforce: true,
        },
      },
    },
    minimize: true,
  },
}