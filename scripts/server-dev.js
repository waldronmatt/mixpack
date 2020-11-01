import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from './webpack.dev.js';
import paths from './paths';

// setup
const app = express();
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));

// config
app.get('*', (req, res, next) => {
  compiler.outputFileSystem.readFile(paths.HTML_FILE, (err, result) => {
  /*
    For errors returned from asynchronous functions invoked by route handlers and middleware,
    you must pass them to the next() function, where Express will catch and process them.
  */
  if (err) {
    return next(err)
  }

  res.type('.html')
  res.send(result);
  res.end();
  });
})

app.listen(paths.PORT, () => {
  console.log(`App listening to ${paths.PORT}....`);
  console.log('Press Ctrl+C to quit.');
})
