const path = require('path');

const distDir = path.resolve(__dirname, 'dist');
const webpack = require('webpack');
// Make sure this plugin is listed first
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const envKeys = require('./src/server/config/dotenv');

module.exports = {
  entry: {
    index: './src/client/index.js',
  },
  output: {
    path: distDir,
    publicPath: '/',
    filename: '[name].js',
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  devServer: {
    port: 5000,
    open: true,
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:8080',
    },
    // instead of 'warning'
    clientLogLevel: 'silent',
  },
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          cache: true,
          emitWarning: true,
          configFile: './.eslintrc.json',
        },
      },
      {
        test: /\.(css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              publicPath: '/',
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS modules
          },
          {
            loader: 'postcss-loader', // Run postcss actions
            options: {
              plugins() {
                // postcss plugins, can be exported to postcss.config.js
                return [require('autoprefixer')];
              },
            },
          },
        ],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg|jpe?g|pdf)$/,
        loader: 'url-loader?limit=100000',
      },
    ],
  },
  mode: 'none',
  plugins: [
    new ESLintPlugin({
      cache: true,
      emitWarning: true,
      configFile: './.eslintrc.json',
    }),
    new HtmlWebpackPlugin({
      title: 'Ready About',
      template: './src/client/template.html',
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    // new webpack.DefinePlugin(envKeys),
  ],
};
