const path = require('path');
const chokidar = require('chokidar');
const webpack = require('webpack');
const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const HtmlValidatePlugin = require('html-validate-webpack-plugin');
const commonConfig = require('./webpack.common.js');
const extendWebpackBaseConfig = require('@waldronmatt/webpack-config');

const developmentConfig = {
  devServer: {
    /*
      We're using chokidar to watch for html files so reloading can occur automatically.
      Why use this method?
      - webpack-live-reload does not support Webpack 5 as of 11/2020
      - webpack-dev-server uses chokidar internally so we don't have to install an extra dependency
      https://stackoverflow.com/questions/52322913/webpack-4-devserver-hmr-plus-full-reload-on-other-file-changes-like-views
    */
    before(app, server) {
      chokidar.watch(['./src/views/**/**']).on('all', function () {
        server.sockWrite(server.sockets, 'content-changed');
      });
    },
    /*
      Tells dev-server to suppress messages like the webpack bundle information.
      Errors and warnings will still be shown.
    */
    noInfo: true,
    // use a rewrite for our 404 page to simulate express logic
    historyApiFallback: {
      rewrites: [{ from: /./, to: '/404.html' }],
    },
    // bundled files will be available in the browser under this path.
    publicPath: '/',
    // tell the server where to serve content from (publicPath takes precedence)
    contentBase: path.resolve(__dirname, '../dist'),
    // open the browser after server starts
    // open: true,
    // enable webpack's Hot Module Replacement feature
    hot: true,
    // specify a port number to listen for requests on:
    port: 8080,
    // useful for debugging
    // writeToDisk: true,
  },
  plugins: [
    new HtmlValidatePlugin({
      path: 'src/views/*',
      config: 'htmlvalidate',
    }),
    new ESLintPlugin({
      extensions: ['js', 'ts'],
    }),
    new StylelintPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
};

module.exports = extendWebpackBaseConfig(commonConfig, developmentConfig);
