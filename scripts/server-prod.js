import express from 'express';
import serverless from 'serverless-http';
import paths from './paths';

// setup
const app = express();
app.use(express.static(__dirname));
app.use('/.netlify/functions/server', router);  // path must route to lambda

// config
app.get('*', (req, res) => {
    res.sendFile(paths.HTML_FILE);
});

app.listen(paths.PORT, () => {
    console.log(`App listening to ${paths.PORT}....`);
    console.log('Press Ctrl+C to quit.');
});

module.exports.handler = serverless(app);
