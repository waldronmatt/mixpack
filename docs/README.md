# MixPack Deep-Dive

## Dependencies

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
  - ESLintWebpackPlugin
  - StylelintWebpackPlugin
- Validators
  - HtmlValidateWebpackPlugin
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
- HTML-validate: offline HTML5 validator
  - Plugins
    - html-validate:recommended (includes html-validate:standard, html-validate:a17y)
