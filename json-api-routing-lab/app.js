import express from 'express';
import configRoutes from './routes/index.js';

const app = express();
const PORT = 3000;

// Configure routes
configRoutes(app);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});