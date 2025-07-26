import { movies } from './mongoCollections.js';
import { ObjectId } from 'mongodb';
import {
  validateObjectId,
  validateTitle,
  validateString,
  validateStudio,
  validateDirector,
  validateRating,
  validateGenres,
  validateCastMembers,
  validateDate,
  validateRuntime
} from './helpers.js';

export const createMovie = async (
  title,
  plot,
  genres,
  rating,
  studio,
  director,
  castMembers,
  dateReleased,
  runtime
) => {
  // Validate all inputs
  const validTitle = validateTitle(title);
  const validPlot = validateString(plot, 'Plot');
  const validGenres = validateGenres(genres);
  const validRating = validateRating(rating);
  const validStudio = validateStudio(studio);
  const validDirector = validateDirector(director);
  const validCastMembers = validateCastMembers(castMembers);
  const validDateReleased = validateDate(dateReleased);
  const validRuntime = validateRuntime(runtime);

  const movieCollection = await movies();
  
  const newMovie = {
    title: validTitle,
    plot: validPlot,
    genres: validGenres,
    rating: validRating,
    studio: validStudio,
    director: validDirector,
    castMembers: validCastMembers,
    dateReleased: validDateReleased,
    runtime: validRuntime
  };

  const insertInfo = await movieCollection.insertOne(newMovie);
  if (!insertInfo.acknowledged || !insertInfo.insertedId) {
    throw new Error('Could not add movie');
  }

  const insertedMovie = await movieCollection.findOne({ _id: insertInfo.insertedId });
  if (!insertedMovie) {
    throw new Error('Could not retrieve the newly created movie');
  }

  // Convert ObjectId to string for return
  insertedMovie._id = insertedMovie._id.toString();
  return insertedMovie;
};

export const getAllMovies = async () => {
  const movieCollection = await movies();
  const movieList = await movieCollection.find({}).toArray();
  
  // Convert all ObjectIds to strings
  return movieList.map(movie => {
    movie._id = movie._id.toString();
    return movie;
  });
};

export const getMovieById = async (id) => {
  validateObjectId(id);
  
  const movieCollection = await movies();
  const movie = await movieCollection.findOne({ _id: new ObjectId(id) });
  
  if (!movie) {
    throw new Error('No movie found with that id');
  }
  
  // Convert ObjectId to string
  movie._id = movie._id.toString();
  return movie;
};

export const removeMovie = async (id) => {
  validateObjectId(id);
  
  const movieCollection = await movies();
  
  // First get the movie to get its title
  const movie = await movieCollection.findOne({ _id: new ObjectId(id) });
  if (!movie) {
    throw new Error('Could not delete movie with that id');
  }
  
  const deletionInfo = await movieCollection.deleteOne({ _id: new ObjectId(id) });
  if (deletionInfo.deletedCount === 0) {
    throw new Error('Could not delete movie with that id');
  }
  
  return `${movie.title} has been successfully deleted!`;
};

export const renameMovie = async (id, newName) => {
  validateObjectId(id);
  const validNewName = validateTitle(newName);
  
  const movieCollection = await movies();
  
  // First check if movie exists and get current title
  const existingMovie = await movieCollection.findOne({ _id: new ObjectId(id) });
  if (!existingMovie) {
    throw new Error('Could not update movie with that id');
  }
  
  // Check if new name is the same as current name
  if (existingMovie.title === validNewName) {
    throw new Error('New name cannot be the same as the current name');
  }
  
  const updateInfo = await movieCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { title: validNewName } }
  );
  
  if (updateInfo.modifiedCount === 0) {
    throw new Error('Could not update movie successfully');
  }
  
  // Get and return the updated movie
  const updatedMovie = await movieCollection.findOne({ _id: new ObjectId(id) });
  updatedMovie._id = updatedMovie._id.toString();
  return updatedMovie;
};