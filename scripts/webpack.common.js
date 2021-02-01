const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  // because css and sass files share similar loader configs, let's build it here and call it
  let styleLoaders = [
    {
      loader: isProduction
        ? // extracts the compiled css from js (overrides default Webpack behavior)
          MiniCssExtractPlugin.loader
        : // inject CSS into the DOM
          'style-loader',
    },
    // interprets import and url like import/require and will resolve them
    {
      loader: 'css-loader',
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

  let miniCssExtract = () => {
    // where the compiled scss is saved to
    return new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
    });
  };

  const capitilizeFirstLetterOfWord = (word) => word.charAt(0).toUpperCase() + word.slice(1);

  // feed an array of page names to dynamically generate pages with attributes
  let multipleHtmlWebPackPlugins = ['index', 'test', '404'].map((name) => {
    return new HtmlWebPackPlugin({
      filename: `${name}.html`,
      title: `${capitilizeFirstLetterOfWord(name)} | Mixpack`,
      template: `./src/views/${name}.html`,
      excludeChunks: ['server'],
      meta: {
        description: 'A mixed TypeScript/JavaScript Webpack boilerplate with Express.',
        keywords: 'webpack, express, typescript, javascript',
        viewport: 'width=device-width',
      },
      base: '/',
    });
  });

  return {
    /*
      specify browser target for code output
      https://github.com/webpack/webpack-dev-server/issues/2758
    */
    target: 'web',
    entry: {
      main: ['./src/js/index.js', './src/ts/index.ts'],
      // webpack code splitting example file
      examples: ['./src/js/examples.js'],
    },
    output: {
      // output directory as an absolute path.
      path: path.join(__dirname, '../dist'),
      // specifies the public URL of the output directory when referenced in a browser.
      publicPath: '/',
      filename: isProduction ? '[name].[contenthash:8].js' : '[name].js',
      // specify chunck path for code splitted files
      chunkFilename: isProduction ? '[name].[contenthash:8].js' : '[name].js',
      /*
        There's a bug with Webpack 5 not transpiling code that is IE11 digestible
        https://github.com/webpack/webpack/issues/11876
        We need to specify features to disable manually for a correct bundle output
        https://webpack.js.org/configuration/output/#outputenvironment
      */
      environment: {
        // the environment supports arrow functions ('() => { ... }').
        arrowFunction: false,
        // the environment supports const and let for variable declarations.
        const: false,
        // the environment supports destructuring ('{ a, b } = obj').
        destructuring: false,
        // the environment supports an async import() function to import EcmaScript modules.
        dynamicImport: false,
        // the environment supports ECMAScript Module syntax to import ECMAScript modules (import ... from '...').
        module: false,
      },
    },
    module: {
      rules: [
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
                // improve the build time
                transpileOnly: true,
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
    // change defaults to resolve both ts and js files
    resolve: {
      extensions: ['.ts', '.js'],
    },
    plugins: [
      isProduction ? miniCssExtract() : false,
      new PreloadWebpackPlugin({
        rel: 'preload',
        include: ['_preload-print'],
      }),
      new PreloadWebpackPlugin({
        rel: 'prefetch',
        include: ['_prefetch-print'],
      }),
      // generate optimized favicons for different devices
      new FaviconsWebpackPlugin({
        /*
          If the webpack mode is set to development the favicons mode will use light.
          If the webpack mode is set to production the favicons mode will use webapp.
          Comment out line below to enable defaults above;
        */
        mode: 'light',
        // Your source logo (required)
        logo: path.resolve(__dirname, '../src/logo.png'),
      }),
    ]
      .concat(multipleHtmlWebPackPlugins)
      // remove empty elements from config (a.k.a. miniCssExtract in dev mode)
      .filter(Boolean),
    performance: {
      hints: 'warning',
    },
  };
};
