import express from 'express';
import serverless from 'serverless-http';
import paths from './paths';
import data from './backend';

// setup
const app = express();

// use express.static() to serve files from several directories
app.use(express.static(__dirname));

// path must route to lambda
app.use('/.netlify/functions/server', router);

// directory to serve template files
app.set('views', __dirname + '/views');

// use `ejs` template engine
app.set('view engine', 'ejs');

// config
app.get('/', (req, res) => {
  // If you simply want to serve static files, use the snippet below
  // res.sendFile(paths.INDEX_FILE);
  res.render('index', { dynamic: data });
});

app.get('/test', (req, res) => {
  res.render('test');
});

// The 404 Route (ALWAYS Keep this as the last route)
app.get('*', (req, res) => {
  res.render('404');
});

app.listen(paths.PORT, () => {
  console.log(`App listening to ${paths.PORT}....`);
  console.log('Press Ctrl+C to quit.');
});

module.exports.handler = serverless(app);
