const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PreloadWebpackPlugin = require('preload-webpack-plugin');

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
      // webpack code splitting example file
      examples: [
        './src/js/examples.js',
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
        // asset/inline exports a data URI of the asset. Previously achievable by using url-loader
        {
          test: /\.(jpe?g|png|gif|svg|webp)$/,
          type: 'asset/inline',
        },
        // asset/resource emits a separate file and exports the URL. Previously achievable by using file-loader
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          type: 'asset/resource',
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
        template: "./src/pages/index.ejs",
        excludeChunks: ['server'],
        meta: {
          'keywords': 'webpack, express',
          'viewport': 'width=device-width',
        },
        base: '/',
      }),
      new PreloadWebpackPlugin({
        rel: 'preload',
        include: ['_preload-print'],
      }),
      new PreloadWebpackPlugin({
        rel: 'prefetch',
        include: ['_prefetch-print'],
      }),
    ],
    performance : {
      hints : 'warning',
    },
  }
};
