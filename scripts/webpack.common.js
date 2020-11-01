const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  target: 'web',
  entry: {
    main: [
      './src/js/index.js',
      './src/ts/index.ts',
    ]
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
          }
        ]
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
      {
        test: /\.(png|svg|jpg|gif|webp)$/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: [ '.ts', '.js', '.jsx', '.tsx' ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      filename: "index.html",
      title: "My Boilerplate App",
      description: "app boilerplate",
      template: "./src/pages/template.ejs",
      excludeChunks: [ 'server' ],
      meta: {
        'keywords': 'webpack, express',
        'viewport': 'width=device-width',
      },
      base: '/'
    }),
  ],
  performance : {
    hints : 'warning',
  },
};
