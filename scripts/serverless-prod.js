import express from 'express';
import serverless from 'serverless-http';
import paths from './paths';

// setup
const app = express();

// use express.static() to serve files from several directories
app.use(express.static(__dirname));

// path must route to lambda
app.use('/.netlify/functions/server', router);

// config
app.get('/', (req, res) => {
  res.sendFile(paths.INDEX_FILE);
});

// The 404 Route (ALWAYS Keep this as the last route)
app.get('*', (req, res) => {
  res.sendFile(paths.ERROR_FILE);
});

app.listen(paths.PORT, () => {
  console.log(`App listening to ${paths.PORT}....`);
  console.log('Press Ctrl+C to quit.');
});

module.exports.handler = serverless(app);
