function errorRoutes(app) {
  // The 404 Route (ALWAYS Keep this as the last route)
  app.get('*', (req, res) => {
    res.render('404');
  });
}

module.exports = {
  initErrorRoutes: errorRoutes,
};
