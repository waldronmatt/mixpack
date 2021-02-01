/* eslint-disable */
const express = require('express');
const paths = require('./scripts/paths');
const { initAllRoutes } = require('./scripts/server-prod');

// setup
const app = express();

// use express.static() to serve files from several directories
app.use(express.static(__dirname + '/dist/views'));

// directory to serve template files
app.set('views', __dirname + '/dist/views');

// use `ejs` template engine
app.set('view engine', 'ejs');

initAllRoutes(app);

app.listen(paths.PORT, () => {
  console.log(`App listening to ${paths.PORT}....`);
  console.log('Press Ctrl+C to quit.');
});
