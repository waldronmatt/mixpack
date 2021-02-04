const path = require('path');
const chokidar = require('chokidar');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const HtmlValidatePlugin = require('html-validate-webpack-plugin');

module.exports = (env, argv) => {
  const config = {
    mode: argv.mode,
    // map your compiled code back to your original source code.
    devtool: 'inline-source-map',
    /*
      Disabling pathinfo:
      webpack has the ability to generate path info in the output bundle. However, this puts
      garbage collection pressure on projects that bundle thousands of modules.
    */
    output: {
      pathinfo: false,
    },
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
      open: true,
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
    optimization: {
      // don't minimize so we can debug
      minimize: false,
      /*
        The value 'single' instead creates a runtime file to be shared for all generated chunks.
        https://github.com/webpack/webpack-dev-server/issues/2792
      */
      // creates an additional chunk for the runtime code, so it's cheap to generate
      runtimeChunk: 'single',
      // https://webpack.js.org/guides/build-performance/#avoid-extra-optimization-steps
      removeAvailableModules: false,
      removeEmptyChunks: false,
      splitChunks: false,
    },
  };
  return merge(common(env, argv), config);
};
