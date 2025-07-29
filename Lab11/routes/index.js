const apiRoutes = require('./routesApi');

const constructorMethod = (app) => {
  app.use('/', apiRoutes);

  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' });
  });
};

module.exports = constructorMethod;