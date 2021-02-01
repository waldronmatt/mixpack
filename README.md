# MixPack

[![Netlify Status](https://api.netlify.com/api/v1/badges/11c9fc21-e526-4b67-936e-f8910deac22b/deploy-status)](https://app.netlify.com/sites/mixpack/deploys) ![webpack](https://img.shields.io/badge/webpack-5.0.0-green)

A mixed TypeScript/JavaScript Webpack boilerplate with Express. [Click here to see it live on Netlify](https://mixpack.netlify.app).

![](docs/repo-logo.png)

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
- HTML

## Dependency Deep-Dive

See the [extended README](docs/README.md)

## Mixpack for the Back End

See the [backend README](docs/backend.md)

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

MIT

## Credits

- Ben Grunfeld's [Expack](https://github.com/bengrunfeld/expack)
- Amina's [Jest mock examples](https://github.com/BulbEnergy/jest-mock-examples)
- Mark Tse's [Netlify Express](https://github.com/neverendingqs/netlify-express)
- Hugo Giraudel's [Sass Boilerplate](https://github.com/HugoGiraudel/sass-boilerplate)
