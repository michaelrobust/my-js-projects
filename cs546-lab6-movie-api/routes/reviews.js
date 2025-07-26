import { Router } from 'express';
import * as reviewData from '../data/reviews.js';
import * as movieData from '../data/movies.js';

const router = Router();

router.get('/:movieId', async (req, res) => {
  try {
    const { movieId } = req.params;
    const reviews = await reviewData.getAllReviews(movieId);
    
    if (reviews.length === 0) {
      return res.status(404).json({ error: 'No reviews found for this movie' });
    }
    
    res.status(200).json(reviews);
  } catch (error) {
    if (error.message.includes('Movie not found')) {
      res.status(404).json({ error: error.message });
    } else if (error.message.includes('must be') || error.message.includes('cannot be')) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

router.post('/:movieId', async (req, res) => {
  try {
    const { movieId } = req.params;
    const { reviewTitle, reviewerName, review, rating } = req.body;

    if (!reviewTitle || !reviewerName || !review || (rating === undefined || rating === null)) {
      return res.status(400).json({ error: 'All fields (reviewTitle, reviewerName, review, rating) must be provided' });
    }

    await reviewData.createReview(movieId, reviewTitle, reviewerName, review, rating);
    const updatedMovie = await movieData.getMovieById(movieId);
    
    res.status(200).json(updatedMovie);
  } catch (error) {
    if (error.message.includes('Movie not found')) {
      res.status(404).json({ error: error.message });
    } else if (error.message.includes('must be') || error.message.includes('cannot be') || 
               error.message.includes('between')) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

router.get('/review/:reviewId', async (req, res) => {
  try {
    const { reviewId } = req.params;
    const review = await reviewData.getReview(reviewId);
    res.status(200).json(review);
  } catch (error) {
    if (error.message.includes('Review not found')) {
      res.status(404).json({ error: error.message });
    } else if (error.message.includes('must be') || error.message.includes('cannot be')) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

router.delete('/review/:reviewId', async (req, res) => {
  try {
    const { reviewId } = req.params;
    const updatedMovie = await reviewData.removeReview(reviewId);
    res.status(200).json(updatedMovie);
  } catch (error) {
    if (error.message.includes('Review not found')) {
      res.status(404).json({ error: error.message });
    } else if (error.message.includes('must be') || error.message.includes('cannot be')) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

export default router;