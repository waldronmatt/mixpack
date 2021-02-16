const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const commonConfig = isProduction => {
  const capitilizeFirstLetterOfWord = word =>
    word.charAt(0).toUpperCase() + word.slice(1);

  // feed an array of page names to dynamically generate pages with attributes
  const multipleHtmlWebPackPlugins = ['index', 'test', '404'].map(name => {
    return new HtmlWebPackPlugin({
      filename: `${name}.html`,
      title: `${capitilizeFirstLetterOfWord(name)} | Mixpack`,
      template: `./src/views/${name}.html`,
      excludeChunks: ['server'],
      meta: {
        description:
          'A mixed TypeScript/JavaScript Webpack boilerplate with Express.',
        keywords: 'webpack, express, typescript, javascript',
        viewport: 'width=device-width',
      },
      base: '/',
    });
  });

  return {
    /*
      DO NOT REMOVE: Solves for hmr issue with browserlist
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
      ],
    },
    plugins: [
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
    ].concat(multipleHtmlWebPackPlugins),
  };
};

module.exports = commonConfig;
