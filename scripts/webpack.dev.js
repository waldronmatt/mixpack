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
      https://stackoverflow.com/questions/52322913/webpack-4-devserver-hmr-plus-full-reload-on-other-file-changes-like-views
    */
    before(app, server) {
      chokidar.watch(['./src/views/**/**']).on('all', function () {
        server.sockWrite(server.sockets, 'content-changed');
      });
    },
    // tells dev-server to suppress messages like the webpack bundle information.
    noInfo: true,
    // shows a full-screen overlay in the browser when there are compiler errors or warnings.
    overlay: {
      errors: true,
      warnings: false,
    },
    // use a rewrite for our 404 page to simulate express logic
    historyApiFallback: {
      rewrites: [{ from: /./, to: '/404.html' }],
    },
    // bundled files will be available in the browser under this path.
    publicPath: '/',
    // enable webpack's Hot Module Replacement feature
    hot: true,
    // specify a port number to listen for requests on:
    port: 8080,
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
    new webpack.ProgressPlugin({
      /*
        We recommend using percentBy: 'entries' setting for projects with multiple configured entry points.
        Percentage calculation will become more accurate because the amount of entry points is known in advance.
      */
      percentBy: 'entries',
      // print progress messages
      handler(percentage, message) {
        let percentComplete = percentage * 100;
        percentComplete === 100
          ? console.log('Complete!')
          : // so we don't get a lot of progress output
          percentComplete % 5 === 0
          ? console.log(`${percentComplete}% ${message}`)
          : null;
      },
    }),
  ],
};

module.exports = extendWebpackBaseConfig(commonConfig, developmentConfig);
