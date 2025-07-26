import peopleRoutes from './people.js';
import stocksRoutes from './stocks.js';

const configRoutes = (app) => {
  app.use('/people', peopleRoutes);
  app.use('/stocks', stocksRoutes);
  
  // Handle 404 for undefined routes
  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' });
  });
};

export default configRoutes;