const { initMainRoutes } = require('../src/routes/main');
const { initErrorRoutes } = require('../src/routes/error');

function allRoutes(app) {
  initMainRoutes(app);
  initErrorRoutes(app);
}

module.exports = {
  initAllRoutes: allRoutes,
};
