# MixPack

[![Netlify Status](https://api.netlify.com/api/v1/badges/981f8252-c7bd-4215-8b05-60aee8402a2d/deploy-status)](https://app.netlify.com/sites/mixpack/deploys) ![webpack](https://img.shields.io/badge/webpack-4.44.1-green)

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

### Production build

Build and serve for production:

        npm run build

### Other commands

Run the server

        npm run serve

Create webp images:

        npm run optimize

Run all tests:

        npm run test

Visualize Webpack output

        npm run analyze

## Features
- Transpile TypeScript, Next-Gen JavaScript, Sass, and Next-Gen CSS
- Testing support for a mixed JS/TS environment using Jest
- Linting support for a mixed JS/TS environment using Eslint
- Integrates the [Express + Webpack (Expack) boilerplate](https://github.com/bengrunfeld/expack) with hot-reloading.
- Optimized Webpack configurations

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

### Webpack
- webpack: module and asset bundler
- webpack-cli: command line interface for Webpack
- webpack-merge: simplify development/production configuration
- webpack-hot-middleware: add hot-reloading capabilities to Express without webpack-dev-server
- webpack-dev-middleware: serves the files emitted from Webpack over Express.
- webpack-livereload-plugin: trigger reloads from Webpack's build pipeline for html includes inside EJS template
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
- file-loader
- url-loader

### Plugins
- File Processing
  - MiniCssExtractPlugin
  - HtmlWebPackPlugin
  - PreloadWebpackPlugin
  - FaviconsWebpackPlugin
- Minifiers
  - TerserPlugin
  - OptimizeCSSAssetsPlugin
  - ImageminPlugin
- Linters
  - ESLintPlugin
  - StylelintPlugin
- Build Optimizers
  - HardSourceWebpackPlugin
- Miscellaneous
  - Webpack Bundle Analyzer
  - LiveReloadPlugin (for EJS includes)
  - imagemin/imagemin-webp - (non-Webpack Plugins)

### Transpilers/Tools
- Babel: transpile modern JavaScript into browser recognizable JavaScript
  - @babel/preset-env: a collection of babel plugins with smart defaults
  - @babel/plugin-transform-runtime: enables the re-use of Babel's injected helper code to save on codesize
  - Plugins
    - @babel/plugin-proposal-class-properties: transforms static class properties
- PostCSS: automate routine CSS operations using JavaScript
  - postcss-preset-env: transpile modern CSS into browser recognizable CSS
  - postcss-import: consume local files, node modules or web_modules
  - Autoprefixer: automatically add vendor prefixes to styles (included with postcss-preset-env)
- Browserlist: share target browsers between different front-end tools
- Core-js: JavaScript polyfill library

### Back-end Tools
- Express: server framework for Node.js
- serverless-http: allows you to 'wrap' your API for serverless use (used for hosting on Netlify)

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
    - stylelint-scss
    - stylelint-order
  - Extentions
    - stylelint-config-standard
    - stylelint-config-sass-guidelines
    - stylelint-config-prettier

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

MIT

## Credits

- Ben Grunfeld's [Expack](https://github.com/bengrunfeld/expack)
- Amina's [Jest mock examples](https://github.com/BulbEnergy/jest-mock-examples)
- Mark Tse's [Netlify Express](https://github.com/neverendingqs/netlify-express)
