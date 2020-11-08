const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  let styleLoaders = [
    {
      loader: isProduction
        // Extracts the compiled css from js (overrides default Webpack behavior)
        ? MiniCssExtractPlugin.loader
        // interprets import and url like import/require and will resolve them
        : 'style-loader',
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
  ];

  return {
    target: 'web',
    entry: {
      main: [
        './src/js/index.js',
        './src/ts/index.ts',
      ],
    },
    output: {
      path: path.join(__dirname, '../dist'),
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader",
              options: {
                attributes: {
                  list: [
                    // All default supported tags and attributes
                    '...',
                    {
                      tag: 'img',
                      attribute: 'data-src',
                      type: 'src',
                    },
                    {
                      tag: 'img',
                      attribute: 'data-srcset',
                      type: 'srcset',
                    },
                  ],
                },
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: styleLoaders,
        },
        {
          test: /\.scss$/,
          use: styleLoaders.concat([
            // loads a sass/scss file and compiles it to css
            {
              loader: 'sass-loader',
            },
          ]),
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
            },
          ],
        },
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
            },
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true, // For hot reloading,
                experimentalWatchApi: true,
              },
            },
          ],
        },
        /*
          url-loader allows you to conditionally inline a file as base-64 data URL if they are smaller than a given threshold.
          This can reduce the amount of HTTP requests for trivial files. If the file is larger than the threshold,
          it automatically falls back to file-loader
        */
        {
          test: /\.(jpe?g|png|gif|svg|webp)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                /*
                  the image is converted to base64 format below the specified limit

                  Note: If below the limit, the image will default to png despite a webp scrset
                */
                limit: 8192,
                name: isProduction ? '[name].[contenthash:8].[ext]' : '[name].[ext]',
              },
            },
          ],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: isProduction ? '[name].[contenthash:8].[ext]' : '[name].[ext]',
              },
            },
          ],
        },
      ],
    },
    // resolve both ts and js files
    resolve: {
      extensions: ['.ts', '.js'],
    },
    plugins: [
      new HtmlWebPackPlugin({
        filename: "index.html",
        title: "My Boilerplate App",
        description: "app boilerplate",
        template: "./src/pages/template.ejs",
        excludeChunks: ['server'],
        meta: {
          'keywords': 'webpack, express',
          'viewport': 'width=device-width',
        },
        base: '/',
      }),
    ],
    performance : {
      hints : 'warning',
    },
  }
};
