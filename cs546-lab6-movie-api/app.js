import express from 'express';
import movieRoutes from './routes/movies.js';
import reviewRoutes from './routes/reviews.js';

const app = express();

app.use(express.json());

app.use('/movies', movieRoutes);
app.use('/reviews', reviewRoutes);

app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});