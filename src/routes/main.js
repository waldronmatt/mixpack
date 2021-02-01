const data = require('../models/main');

function mainRoutes(app) {
  // config
  app.get('/', (req, res) => {
    // If you simply want to serve static files, use the snippet below
    // res.sendFile(paths.INDEX_FILE);
    res.render('index', { index: data.index });
  });

  app.get('/test', (req, res) => {
    res.render('test');
  });
}

module.exports = {
  initMainRoutes: mainRoutes,
};
