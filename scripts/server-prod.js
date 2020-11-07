import express from 'express';

/*
  Comment out code below for server-enabled Express without Netlify
*/
import serverless from 'serverless-http';
/*
  ------------------------------------------------------
*/

import paths from './paths';

// setup
const app = express();
app.use(express.static(__dirname));

/*
  Comment out code below for server-enabled Express without Netlify
*/
app.use('/.netlify/functions/server', router);  // path must route to lambda
/*
  ------------------------------------------------------
*/

// config
app.get('*', (req, res) => {
    res.sendFile(paths.HTML_FILE);
});

app.listen(paths.PORT, () => {
    console.log(`App listening to ${paths.PORT}....`);
    console.log('Press Ctrl+C to quit.');
});

/*
  Comment out code below for server-enabled Express without Netlify
*/
module.exports.handler = serverless(app);
/*
  ------------------------------------------------------
*/
