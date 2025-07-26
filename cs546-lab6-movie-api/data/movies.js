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

const validateString = (str, fieldName, minLength = 1) => {
  if (!str && str !== '') throw new Error(`${fieldName} must be provided`);
  if (typeof str !== 'string') throw new Error(`${fieldName} must be a string`);
  if (str.trim().length === 0) throw new Error(`${fieldName} cannot be an empty string or just spaces`);
  if (str.trim().length < minLength) throw new Error(`${fieldName} must be at least ${minLength} characters long`);
  return str.trim();
};

const validateTitle = (title) => {
  const trimmedTitle = validateString(title, 'Title', 2);
  if (!/^[a-zA-Z0-9\s]+$/.test(trimmedTitle)) {
    throw new Error('Title must contain only letters, numbers, and spaces');
  }
  return trimmedTitle;
};

const validateStudio = (studio) => {
  const trimmedStudio = validateString(studio, 'Studio', 5);
  if (!/^[a-zA-Z\s]+$/.test(trimmedStudio)) {
    throw new Error('Studio must contain only letters and spaces');
  }
  return trimmedStudio;
};

const validateDirector = (director) => {
  const trimmedDirector = validateString(director, 'Director');
  const nameParts = trimmedDirector.split(' ');
  if (nameParts.length !== 2) {
    throw new Error('Director must have the format "First Last"');
  }
  const [firstName, lastName] = nameParts;
  if (firstName.length < 3 || lastName.length < 3) {
    throw new Error('Director first name and last name must be at least 3 characters each');
  }
  if (!/^[a-zA-Z]+$/.test(firstName) || !/^[a-zA-Z]+$/.test(lastName)) {
    throw new Error('Director name must contain only letters');
  }
  return trimmedDirector;
};

const validateRating = (rating) => {
  const trimmedRating = validateString(rating, 'Rating');
  const validRatings = ['G', 'PG', 'PG-13', 'R', 'NC-17'];
  if (!validRatings.includes(trimmedRating)) {
    throw new Error('Rating must be one of: G, PG, PG-13, R, NC-17');
  }
  return trimmedRating;
};

const validateGenres = (genres) => {
  if (!genres) throw new Error('Genres must be provided');
  if (!Array.isArray(genres)) throw new Error('Genres must be an array');
  if (genres.length === 0) throw new Error('Genres array cannot be empty');
  const validGenres = [];
  for (let genre of genres) {
    const trimmedGenre = validateString(genre, 'Genre', 5);
    if (!/^[a-zA-Z\s]+$/.test(trimmedGenre)) {
      throw new Error('Each genre must contain only letters and spaces');
    }
    validGenres.push(trimmedGenre);
  }
  return validGenres;
};

const validateCastMembers = (castMembers) => {
  if (!castMembers) throw new Error('Cast Members must be provided');
  if (!Array.isArray(castMembers)) throw new Error('Cast Members must be an array');
  if (castMembers.length === 0) throw new Error('Cast Members array cannot be empty');
  const validCast = [];
  for (let member of castMembers) {
    const trimmedMember = validateString(member, 'Cast Member');
    const nameParts = trimmedMember.split(' ');
    if (nameParts.length !== 2) {
      throw new Error('Each cast member must have the format "First Last"');
    }
    const [firstName, lastName] = nameParts;
    if (firstName.length < 3 || lastName.length < 3) {
      throw new Error('Cast member first name and last name must be at least 3 characters each');
    }
    if (!/^[a-zA-Z]+$/.test(firstName) || !/^[a-zA-Z]+$/.test(lastName)) {
      throw new Error('Cast member names must contain only letters');
    }
    validCast.push(trimmedMember);
  }
  return validCast;
};

const validateDate = (dateString) => {
  const trimmedDate = validateString(dateString, 'Date Released');
  
  // Check format mm/dd/yyyy
  const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/(\d{4})$/;
  if (!dateRegex.test(trimmedDate)) {
    throw new Error('Date must be in format mm/dd/yyyy');
  }
  
  const [month, day, year] = trimmedDate.split('/').map(Number);
  
  // Check year range (1900 to current year + 2)
  const currentYear = new Date().getFullYear();
  if (year < 1900 || year > currentYear + 2) {
    throw new Error(`Year must be between 1900 and ${currentYear + 2}`);
  }
  
  // Validate the actual date
  const date = new Date(year, month - 1, day);
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    throw new Error('Invalid date provided');
  }
  
  return trimmedDate;
};

const validateRuntime = (runtime) => {
  const trimmedRuntime = validateString(runtime, 'Runtime');
  
  // Check format #h #min
  const runtimeRegex = /^(\d+)h (\d+)min$/;
  const match = trimmedRuntime.match(runtimeRegex);
  
  if (!match) {
    throw new Error('Runtime must be in format "#h #min"');
  }
  
  const hours = parseInt(match[1]);
  const minutes = parseInt(match[2]);
  
  if (hours <= 0) {
    throw new Error('Hours must be greater than 0');
  }
  
  if (minutes < 0 || minutes > 59) {
    throw new Error('Minutes must be between 0 and 59');
  }
  
  return trimmedRuntime;
};

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
    runtime: validRuntime,
    reviews: [],
    overallRating: 0
  };

  const insertInfo = await movieCollection.insertOne(newMovie);
  if (!insertInfo.acknowledged || !insertInfo.insertedId) {
    throw new Error('Could not add movie');
  }

  const insertedMovie = await movieCollection.findOne({ _id: insertInfo.insertedId });
  if (!insertedMovie) {
    throw new Error('Could not retrieve the newly created movie');
  }

  insertedMovie._id = insertedMovie._id.toString();
  return insertedMovie;
};

export const getAllMovies = async () => {
  const movieCollection = await movies();
  const movieList = await movieCollection.find({}).toArray();
  
  return movieList.map(movie => ({
    _id: movie._id.toString(),
    title: movie.title
  }));
};

export const getMovieById = async (id) => {
  validateObjectId(id);
  
  const movieCollection = await movies();
  const movie = await movieCollection.findOne({ _id: new ObjectId(id) });
  
  if (!movie) {
    throw new Error('No movie found with that id');
  }
  
  movie._id = movie._id.toString();
  if (movie.reviews && movie.reviews.length > 0) {
    movie.reviews = movie.reviews.map(review => ({
      ...review,
      _id: review._id.toString()
    }));
  }
  
  return movie;
};

export const removeMovie = async (id) => {
  validateObjectId(id);
  
  const movieCollection = await movies();
  
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

export const updateMovie = async (
  id,
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
  validateObjectId(id);
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
  
  const existingMovie = await movieCollection.findOne({ _id: new ObjectId(id) });
  if (!existingMovie) {
    throw new Error('Could not update movie with that id');
  }
  
  const updatedMovie = {
    title: validTitle,
    plot: validPlot,
    genres: validGenres,
    rating: validRating,
    studio: validStudio,
    director: validDirector,
    castMembers: validCastMembers,
    dateReleased: validDateReleased,
    runtime: validRuntime,
    reviews: existingMovie.reviews,
    overallRating: existingMovie.overallRating
  };
  
  const updateInfo = await movieCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: updatedMovie }
  );
  
  if (updateInfo.modifiedCount === 0) {
    throw new Error('Could not update movie successfully');
  }
  
  const updatedMovieData = await movieCollection.findOne({ _id: new ObjectId(id) });
  updatedMovieData._id = updatedMovieData._id.toString();
  
  if (updatedMovieData.reviews && updatedMovieData.reviews.length > 0) {
    updatedMovieData.reviews = updatedMovieData.reviews.map(review => ({
      ...review,
      _id: review._id.toString()
    }));
  }
  
  return updatedMovieData;
};