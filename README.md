# MixPack

[![Netlify Status](https://api.netlify.com/api/v1/badges/11c9fc21-e526-4b67-936e-f8910deac22b/deploy-status)](https://app.netlify.com/sites/mixpack/deploys) ![webpack](https://img.shields.io/badge/webpack-5.0.0-green)

A mixed TypeScript/JavaScript Webpack boilerplate with Express. [Click here to see it live on Netlify](https://mixpack.netlify.app).

![](repo-logo.png)

## Introduction

Mix and match TypeScript and ES6+ JavaScript alongside Sass and Next-Gen CSS using Express.

## Why Use MixPack?

Mixpack sets out to provide an all-in-one Webpack boilerplate solution using core frontend technologies and sensible optimization defaults.

## Fork and Launch

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/waldronmatt/mixpack)

## Installation

Install dependencies:

        npm install

## Usage

### Development server

Run dev environment:

        npm run dev

### Production build (serverless)

Build and serve for production:

**Note:** Configure this command in your Netlify account.

        npm run build

### Other commands

Build and serve for production (locally):

**Note:** Point to `server: './scripts/server-prod.js',` in `webpack.server.config`.

        npm run build
        npm run serve

Run all tests:

        npm run test

Run all tests with additional coverage information:

        npm run coverage

Visualize Webpack output:

**Note:** First, make sure `debug: true,` is disabled in `babel.config.js`.

        npm run analyze

Create webp images:

        npm run optimize

Lint html files:

        npm run linthtml

## Features

- Transpile TypeScript, Next-Gen JavaScript, Sass, and Next-Gen CSS
- Testing support for a mixed JS/TS environment using Jest
- Linting support for a mixed JS/TS and CSS/Sass environment using Eslint and Stylelint
- Integrates the [Express + Webpack (Expack) boilerplate](https://github.com/bengrunfeld/expack)
- Includes an organized [sass boilerplate](https://github.com/HugoGiraudel/sass-boilerplate)
- Optimized Webpack configurations
- Includes code splitting examples

## Technologies

- Webpack
- Express
- Babel
- PostCSS
- Jest
- TypeScript
- Next-Gen JavaScript
- Sass
- Next-Gen CSS
- EJS/HTML

## Dependency Deep-Dive

### Front end production dependencies

- core.js - polyfill library to support older browsers
- sanitize.css - css normalization library to set default, cross-browser stylings

### Webpack

- webpack: module and asset bundler
- webpack-cli: command line interface for Webpack
- webpack-merge: simplify development/production configuration
- webpack-node-externals: exclude node modules in Webpack

### Loaders

- style-loader
- mini-css-extract-loader
- css-loader
- postcss-loader
- sass-loader
- html-loader
- babel-loader
- ts-loader

### Plugins

- File Processing
  - MiniCssExtractPlugin
  - HtmlWebPackPlugin
  - PreloadWebpackPlugin
  - FaviconsWebpackPlugin
- Minifiers
  - TerserPlugin (Comes bundled with Webpack)
  - CssMinimizerWebpackPlugin
  - ImageminPlugin
- Linters
  - ESLintPlugin
  - StylelintPlugin
- Miscellaneous
  - Webpack Bundle Analyzer
  - imagemin-webp - (separately generate webp images)

### Transpilers/Tools

- Babel: transpile modern JavaScript into browser recognizable JavaScript
  - @babel/preset-env: a collection of babel plugins with smart defaults
  - @babel/plugin-transform-runtime: enables the re-use of Babel's injected helper code to save on codesize
  - @babel/runtime: babel's modular runtime helpers
  - @babel/plugin-proposal-class-properties: transforms static class properties
- PostCSS: automate routine CSS operations using JavaScript
  - postcss-preset-env: transpile modern CSS into browser recognizable CSS
  - postcss-import: consume local files, node modules or web_modules
  - Autoprefixer: automatically add vendor prefixes to styles (included with postcss-preset-env)
- Browserlist: share target browsers between different front-end tools

### Back-end Tools

- Express: server framework for Node.js
- serverless-http: allows you to 'wrap' your API for serverless use (used for hosting on Netlify)
- webpack-dev-server: development server that provides live/hot reloading

### Testing

- Jest - JavaScript testing framework
  - babel-jest: Jest plugin to use Babel for transformation
  - ts-jest: preprocessor to use TypeScript with Jest
  - jest-transform-stub: avoid errors when importing non-JS assets

### Linters

- Prettier: formatter for scripts and styles
- EditorConfig: general file formatter for your editor/IDE
- ESLint: script linter
  - Parsers
    - @babel/eslint-parser
    - @typescript-eslint/parser
  - Plugins
    - @typescript-eslint/eslint-plugin
    - eslint-plugin-prettier
    - eslint-plugin-import
  - Extentions
    - eslint:recommended
    - eslint-config-airbnb-base
    - eslint-config-prettier
    - plugin:@typescript-eslint/recommended
    - eslint-config-airbnb-typescript
- StyleLint: stylesheet linter
  - Plugins
    - stylelint-order
    - stylelint-scss
    - stylelint-prettier
  - Extentions
    - stylelint-config-standard (includes stylelint-config-recommended)
    - stylelint-config-recommended-scss
    - stylelint-config-sass-guidelines
    - stylelint-config-prettier
- HTML-validate: offline HTML5 validator (includes html-validate:standard, html-validate:a17y)
  - Plugins
    - html-validate:recommended

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

MIT

## Credits

- Ben Grunfeld's [Expack](https://github.com/bengrunfeld/expack)
- Amina's [Jest mock examples](https://github.com/BulbEnergy/jest-mock-examples)
- Mark Tse's [Netlify Express](https://github.com/neverendingqs/netlify-express)
- Hugo Giraudel's [Sass Boilerplate](https://github.com/HugoGiraudel/sass-boilerplate)
