import { Router } from 'express';
import * as movieData from '../data/movies.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const movies = await movieData.getAllMovies();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, plot, genres, rating, studio, director, castMembers, dateReleased, runtime } = req.body;

    if (!title || !plot || !genres || !rating || !studio || !director || !castMembers || !dateReleased || !runtime) {
      return res.status(400).json({ error: 'All fields must be provided' });
    }

    const newMovie = await movieData.createMovie(
      title, plot, genres, rating, studio, director, castMembers, dateReleased, runtime
    );

    res.status(200).json(newMovie);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/:movieId', async (req, res) => {
  try {
    const { movieId } = req.params;
    const movie = await movieData.getMovieById(movieId);
    res.status(200).json(movie);
  } catch (error) {
    if (error.message.includes('not a valid ObjectId') || error.message.includes('No movie found')) {
      res.status(404).json({ error: error.message });
    } else if (error.message.includes('must be') || error.message.includes('cannot be')) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

router.put('/:movieId', async (req, res) => {
  try {
    const { movieId } = req.params;
    const { title, plot, genres, rating, studio, director, castMembers, dateReleased, runtime } = req.body;

    if (!title || !plot || !genres || !rating || !studio || !director || !castMembers || !dateReleased || !runtime) {
      return res.status(400).json({ error: 'All fields must be provided' });
    }

    const updatedMovie = await movieData.updateMovie(
      movieId, title, plot, genres, rating, studio, director, castMembers, dateReleased, runtime
    );

    res.status(200).json(updatedMovie);
  } catch (error) {
    if (error.message.includes('Could not update movie with that id')) {
      res.status(404).json({ error: error.message });
    } else if (error.message.includes('must be') || error.message.includes('cannot be') || 
               error.message.includes('format')) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

router.delete('/:movieId', async (req, res) => {
  try {
    const { movieId } = req.params;
    await movieData.removeMovie(movieId);
    res.status(200).json({ movieId: movieId, deleted: true });
  } catch (error) {
    if (error.message.includes('Could not delete movie with that id')) {
      res.status(404).json({ error: error.message });
    } else if (error.message.includes('must be') || error.message.includes('cannot be')) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

export default router;