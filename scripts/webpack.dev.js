const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  // Map your compiled code back to your original source code.
  devtool: 'inline-source-map',
  target: 'web',
  entry: {
    main: [
      'webpack/hot/dev-server',
      'webpack-hot-middleware/client',
    ]
  },
  output: {
    filename: '[name].js',
    // specify chunck path for code splitted files
    chunkFilename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // interprets import and url like import/require and will resolve them
          {
            loader: "style-loader",
          },
          // interprets import and url like import/require and will resolve them
          {
            loader: "css-loader",
          },
          /*
            loader for webpack to process css with PostCSS

            postcss-loader should be placed after css-loader and style-loader,
            but before other preprocessor loaders like e.g sass|less|stylus-loader
            https://github.com/webpack-contrib/postcss-loader#config-cascade
          */
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                config: path.resolve(__dirname, '../postcss.config.js'),
              },
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                config: path.resolve(__dirname, '../postcss.config.js'),
              },
            },
          },
          // loads a sass/scss file and compiles it to css
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
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
});
