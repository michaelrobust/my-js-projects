import { movies } from '../config/mongoCollections.js';
import { ObjectId } from 'mongodb';

// Helper validation functions
const validateObjectId = (id) => {
  if (!id) throw new Error('Id parameter must be supplied');
  if (typeof id !== 'string') throw new Error('Id must be a string');
  if (id.trim().length === 0) throw new Error('Id cannot be an empty string');
  if (!ObjectId.isValid(id)) throw new Error('Id is not a valid ObjectId');
  return id.trim();
};

const validateString = (str, fieldName) => {
  if (!str && str !== '') throw new Error(`${fieldName} must be provided`);
  if (typeof str !== 'string') throw new Error(`${fieldName} must be a string`);
  if (str.trim().length === 0) throw new Error(`${fieldName} cannot be an empty string or just spaces`);
  return str.trim();
};

const validateRating = (rating) => {
  if (!rating && rating !== 0) throw new Error('Rating must be provided');
  if (typeof rating === 'string') {
    if (rating.trim() === '') throw new Error('Rating cannot be an empty string');
    rating = parseFloat(rating);
  }
  if (typeof rating !== 'number' || isNaN(rating)) {
    throw new Error('Rating must be a valid number');
  }
  if (rating < 1 || rating > 5) {
    throw new Error('Rating must be between 1 and 5');
  }
  return Math.round(rating * 10) / 10;
};

export const createReview = async (movieId, reviewTitle, reviewerName, review, rating) => {
  const validMovieId = validateObjectId(movieId);
  const validReviewTitle = validateString(reviewTitle, 'Review Title');
  const validReviewerName = validateString(reviewerName, 'Reviewer Name');
  const validReview = validateString(review, 'Review');
  const validRating = validateRating(rating);

  const movieCollection = await movies();
  
  const existingMovie = await movieCollection.findOne({ _id: new ObjectId(validMovieId) });
  if (!existingMovie) {
    throw new Error('Movie not found with that id');
  }
  
  const currentDate = new Date();
  const reviewDate = `${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getDate().toString().padStart(2, '0')}/${currentDate.getFullYear()}`;
  
  const newReview = {
    _id: new ObjectId(),
    reviewTitle: validReviewTitle,
    reviewDate: reviewDate,
    reviewerName: validReviewerName,
    review: validReview,
    rating: validRating
  };
  
  const updateInfo = await movieCollection.updateOne(
    { _id: new ObjectId(validMovieId) },
    { $push: { reviews: newReview } }
  );
  
  if (updateInfo.modifiedCount === 0) {
    throw new Error('Could not add review');
  }
  
  const updatedMovie = await movieCollection.findOne({ _id: new ObjectId(validMovieId) });
  const totalRating = updatedMovie.reviews.reduce((sum, rev) => sum + rev.rating, 0);
  const newOverallRating = Math.round((totalRating / updatedMovie.reviews.length) * 10) / 10;
  
  await movieCollection.updateOne(
    { _id: new ObjectId(validMovieId) },
    { $set: { overallRating: newOverallRating } }
  );
  
  const returnReview = { ...newReview };
  returnReview._id = returnReview._id.toString();
  return returnReview;
};

export const getAllReviews = async (movieId) => {
  const validMovieId = validateObjectId(movieId);
  
  const movieCollection = await movies();
  const movie = await movieCollection.findOne({ _id: new ObjectId(validMovieId) });
  
  if (!movie) {
    throw new Error('Movie not found with that id');
  }
  
  return movie.reviews.map(review => ({
    ...review,
    _id: review._id.toString()
  }));
};

export const getReview = async (reviewId) => {
  const validReviewId = validateObjectId(reviewId);
  
  const movieCollection = await movies();
  
  const movie = await movieCollection.findOne(
    { 'reviews._id': new ObjectId(validReviewId) }
  );
  
  if (!movie) {
    throw new Error('Review not found with that id');
  }
  
  const reviewObj = movie.reviews.find(review => 
    review._id.toString() === validReviewId
  );
  
  if (!reviewObj) {
    throw new Error('Review not found with that id');
  }
  
  const returnReview = { ...reviewObj };
  returnReview._id = returnReview._id.toString();
  return returnReview;
};

export const removeReview = async (reviewId) => {
  const validReviewId = validateObjectId(reviewId);
  
  const movieCollection = await movies();
  
  const movie = await movieCollection.findOne(
    { 'reviews._id': new ObjectId(validReviewId) }
  );
  
  if (!movie) {
    throw new Error('Review not found with that id');
  }
  
  const updateInfo = await movieCollection.updateOne(
    { _id: movie._id },
    { $pull: { reviews: { _id: new ObjectId(validReviewId) } } }
  );
  
  if (updateInfo.modifiedCount === 0) {
    throw new Error('Could not remove review');
  }
  
  const updatedMovie = await movieCollection.findOne({ _id: movie._id });
  let newOverallRating = 0;
  
  if (updatedMovie.reviews.length > 0) {
    const totalRating = updatedMovie.reviews.reduce((sum, rev) => sum + rev.rating, 0);
    newOverallRating = Math.round((totalRating / updatedMovie.reviews.length) * 10) / 10;
  }
  
  await movieCollection.updateOne(
    { _id: movie._id },
    { $set: { overallRating: newOverallRating } }
  );
  
  const finalMovie = await movieCollection.findOne({ _id: movie._id });
  finalMovie._id = finalMovie._id.toString();
  
  if (finalMovie.reviews && finalMovie.reviews.length > 0) {
    finalMovie.reviews = finalMovie.reviews.map(review => ({
      ...review,
      _id: review._id.toString()
    }));
  }
  
  return finalMovie;
};