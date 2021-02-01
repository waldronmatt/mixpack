# MixPack for the back end

You can configure Mixpack to watch and bundle for front end and back end code.

Read the tutorial below and/or fork the experimental [fullstack](https://github.com/waldronmatt/mixpack/tree/fullstack) branch.

## Setup

Install nodemon as a dev dependency. We will use it to watch for changes on the server and back end code.

        npm i -D nodemon

Install ejs as a dependency so express can use as a view engine:

        npm i ejs

Set up an npm script to bundle and watch code for front end and back end code:

        nodemon --delay 1500ms ./server-dev.js & webpack serve --mode development --config ./scripts/webpack.dev.js

- `delay 1500ms` helps mitigate proxy errors by delaying reloading execution.
  - This is useful if you are using chokidar to hmr `.html` files.
- `&` allows npm to run two scripts in parallel for unix and unix-like systems.
  - For windows users, you will need to use an npm utility.

Set up a proxy for `webpack-dev-server` in `webpack.dev.js`.

The dev server will forward requests from the front end to your express server.

`webpack.dev.js`

        devServer: {
          ...
          port: 3000
          proxy: {
            'http://localhost:3000/': 'http://localhost:8080',
            secure: false,
          },
        }

Set up your express dev server in the root of your project folder.

`server-dev.js`

        const express = require('express');
        const paths = require('./scripts/paths');

        // setup
        const app = express();

        // use express.static() to serve files from several directories
        app.use(express.static(__dirname + '/dist/views'));

        // directory to serve template files
        app.set('views', __dirname + '/dist/views');

        // use `ejs` template engine
        app.set('view engine', 'ejs');

        // routes
        app.get('/', (req, res) => {
          res.render('index', { index: 'Dynamic data was injected via the back end!' });
        });

        app.get('*', (req, res) => {
          res.render('404');
        });

        app.listen(paths.PORT, () => {
          console.log(`App listening to ${paths.PORT}....`);
          console.log('Press Ctrl+C to quit.');
        });

To inject data from the back end, we will need to create an `.html` partial and include into `index.html`.

`dynamic-index.html`

        <p class="center"><%= index %></p>

- `<%= index %>` is the variable used by express to inject data: `res.render('index', { index: 'Dynamic data...' });`

`index.html`

        <main>
            ...
            <%= require('html-loader!./dynamic-index.html') %>
            ...
        </main>

- Importing the partial using `html-loader`, allows for `<%= index %>` to be skipped by `htmlwebpackplugin` and processed by express.

Configure htmlwebpackplugin to output ejs files.

        return new HtmlWebPackPlugin({
          filename: `views/${name}.ejs`,
          ...
        });

**Completed!** Run `npm run dev` and now you should be all set for both front end and back end development.

## Notes

You can use the existing `server-prod.js` file for production builds. Simply update `webpack.server.config` to point to it.

         entry: {
          server: './scripts/server-prod.js',
        },

To reduce code duplication, set up an intermediary entry point `routes.js` to feed all routes and back end logic to both server configs.

This allows for modularity of your back end logic (routes, controllers, models) from your server configurations.

`routes.js` via `src/routes/` folder

        const { initIndexRoutes } = require('./index');
        const { initErrorRoutes } = require('./error');

        function allRoutes(app) {
          initIndexRoutes(app);
          initErrorRoutes(app);
        }

        module.exports = {
          initAllRoutes: allRoutes,
        };

`index.js` via `src/routes/` folder

        function indexRoutes(app) {
          app.get('/', (req, res) => {
            res.render('index', { index: 'Dynamic data was injected via the back end!' });
          });
        }

        module.exports = {
          initIndexRoutes: indexRoutes,
        };

`error.js`

        function errorRoutes(app) {
          app.get('*', (req, res) => {
            res.render('404');
          });
        }

        module.exports = {
          initErrorRoutes: errorRoutes,
        };

`server-dev.js` and `server-prod.js`

        const { initAllRoutes } = require('./src/routes/routes.js');
        ...
        // setup
        const app = express();
        ...
        initAllRoutes(app);
