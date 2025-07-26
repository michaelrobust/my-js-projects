import { ObjectId } from 'mongodb';

// Helper function to validate ObjectId
export const validateObjectId = (id) => {
  if (!id) throw new Error('Id parameter must be supplied');
  if (typeof id !== 'string') throw new Error('Id must be a string');
  if (id.trim().length === 0) throw new Error('Id cannot be an empty string');
  if (!ObjectId.isValid(id)) throw new Error('Id is not a valid ObjectId');
  return true;
};

// Helper function to validate string inputs
export const validateString = (str, fieldName, minLength = 1) => {
  if (!str && str !== '') throw new Error(`${fieldName} must be provided`);
  if (typeof str !== 'string') throw new Error(`${fieldName} must be a string`);
  if (str.trim().length === 0) throw new Error(`${fieldName} cannot be an empty string or just spaces`);
  if (str.trim().length < minLength) throw new Error(`${fieldName} must be at least ${minLength} characters long`);
  return str.trim();
};

// Helper function to validate array inputs
export const validateArray = (arr, fieldName, minLength = 1) => {
  if (!arr) throw new Error(`${fieldName} must be provided`);
  if (!Array.isArray(arr)) throw new Error(`${fieldName} must be an array`);
  if (arr.length < minLength) throw new Error(`${fieldName} must have at least ${minLength} element(s)`);
  return true;
};

// Helper function to validate title
export const validateTitle = (title) => {
  const trimmedTitle = validateString(title, 'Title', 2);
  if (!/^[a-zA-Z0-9\s]+$/.test(trimmedTitle)) {
    throw new Error('Title must contain only letters, numbers, and spaces');
  }
  return trimmedTitle;
};

// Helper function to validate studio
export const validateStudio = (studio) => {
  const trimmedStudio = validateString(studio, 'Studio', 5);
  if (!/^[a-zA-Z\s]+$/.test(trimmedStudio)) {
    throw new Error('Studio must contain only letters and spaces');
  }
  return trimmedStudio;
};

// Helper function to validate director name format
export const validateDirector = (director) => {
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

// Helper function to validate rating
export const validateRating = (rating) => {
  const trimmedRating = validateString(rating, 'Rating');
  const validRatings = ['G', 'PG', 'PG-13', 'R', 'NC-17'];
  if (!validRatings.includes(trimmedRating)) {
    throw new Error('Rating must be one of: G, PG, PG-13, R, NC-17');
  }
  return trimmedRating;
};

// Helper function to validate genres
export const validateGenres = (genres) => {
  validateArray(genres, 'Genres');
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

// Helper function to validate cast members
export const validateCastMembers = (castMembers) => {
  validateArray(castMembers, 'Cast Members');
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

// Helper function to validate date
export const validateDate = (dateString) => {
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

// Helper function to validate runtime
export const validateRuntime = (runtime) => {
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