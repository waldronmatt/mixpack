import express from 'express';
import paths from './paths';

// setup
const app = express();
app.use(express.static(__dirname));

// config
app.get('*', (req, res) => {
    res.sendFile(paths.HTML_FILE);
});

app.listen(paths.PORT, () => {
    console.log(`App listening to ${paths.PORT}....`);
    console.log('Press Ctrl+C to quit.');
});
