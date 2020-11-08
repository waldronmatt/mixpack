const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = (env, argv) => {
  const config = {
    mode: argv.mode,
    // Map your compiled code back to your original source code.
    devtool: 'inline-source-map',
    target: 'web',
    entry: {
      main: [
        'webpack/hot/dev-server',
        'webpack-hot-middleware/client',
      ],
    },
    output: {
      filename: '[name].js',
      // specify chunck path for code splitted files
      chunkFilename: '[name].js',
    },
    plugins: [
      /*
        Provides an intermediate caching step for modules
        Not using on prod builds because Netlify stalls out a while
      */
      new HardSourceWebpackPlugin(),
      new LiveReloadPlugin({
        appendScriptTag: true,
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
    },
  };
  return merge(common(env, argv), config);
};
