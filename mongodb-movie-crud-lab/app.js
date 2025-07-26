import * as movies from './movies.js';
import { dbConnection, closeConnection } from './mongoConnection.js';

// Drop the database each time this is run (for testing purposes)
const db = await dbConnection();
await db.dropDatabase();

// Defining these here so I can use them later
let movie1 = undefined;
let movie2 = undefined;
let movie3 = undefined;

console.log("Let's add some movies!");

// 1. Create a Movie of your choice
try {
  movie1 = await movies.createMovie(
    "The Matrix",
    "A computer programmer is led to fight an underground war against powerful computers who have constructed his entire reality with a system called the Matrix.",
    ["Action", "Science Fiction"],
    "R",
    "Warner Brothers",
    "Lana Wachowski",
    ["Keanu Reeves", "Laurence Fishburne", "Carrie Moss", "Hugo Weaving"],
    "03/31/1999",
    "2h 16min"
  );
  console.log('The Matrix has been added!');
  console.log(movie1);
} catch (e) {
  console.log(e);
}

// 2. Create another movie of your choice
try {
  movie2 = await movies.createMovie(
    "Inception",
    "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
    ["Action", "Science Fiction", "Thriller"],
    "PG-13",
    "Warner Brothers",
    "Christopher Nolan",
    ["Leonardo DiCaprio", "Marion Cotillard", "Tom Hardy", "Ellen Page"],
    "07/16/2010",
    "2h 28min"
  );
  console.log('Inception has been added!');
} catch (e) {
  console.log(e);
}

// 3. Query all movies, and log them all
console.log('Now lets get all movies from the DB');
try {
  const movieList = await movies.getAllMovies();
  console.log(movieList);
} catch (e) {
  console.log(e);
}

// 4. Create the 3rd movie of your choice
try {
  movie3 = await movies.createMovie(
    "Interstellar",
    "A team of explorers travel through a wormhole in space in an attempt to ensure humanity survival.",
    ["Drama", "Science Fiction"],
    "PG-13",
    "Paramount Pictures",
    "Christopher Nolan",
    ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain", "Michael Caine"],
    "11/07/2014",
    "2h 49min"
  );
  console.log('Interstellar has been added!');
  console.log(movie3);
} catch (e) {
  console.log(e);
}

// 5. Rename the first movie
console.log("Let's change the title of the first movie...");
try {
  const updatedMovie = await movies.renameMovie(movie1._id.toString(), "The Matrix Reloaded");
  console.log('Now, the movie is:');
  console.log(updatedMovie);
} catch (e) {
  console.log(e);
}

// 6. Remove the second movie you created
console.log("Now let's remove the second movie");
try {
  let deleted = await movies.removeMovie(movie2._id.toString());
  console.log(deleted);
} catch (e) {
  console.log(e);
}

// 7. Query all movies, and log them all
console.log('Lets now get all movies from the DB after deletion');
try {
  const movieList = await movies.getAllMovies();
  console.log(movieList);
} catch (e) {
  console.log(e);
}

console.log("Now let's test some movie cases that fail");

// 8. Try to create a movie with bad input parameters
try {
  const fail = await movies.createMovie(
    "", // Empty title should throw error
    "A plot",
    ["Action"],
    "R",
    "Studios",
    "John Doe",
    ["Actor One"],
    "01/01/2020",
    "2h 0min"
  );
} catch (e) {
  console.log(e);
}

try {
  const fail = await movies.createMovie(
    "Test Movie",
    "A plot",
    [], // Empty genres array should throw error
    "R",
    "Studios",
    "John Doe",
    ["Actor One"],
    "01/01/2020",
    "2h 0min"
  );
} catch (e) {
  console.log(e);
}

try {
  const fail = await movies.createMovie(
    "Test Movie",
    "A plot",
    ["Action"],
    "XX", // Invalid rating should throw error
    "Studios",
    "John Doe",
    ["Actor One"],
    "01/01/2020",
    "2h 0min"
  );
} catch (e) {
  console.log(e);
}

try {
  const fail = await movies.createMovie(
    123, // Non-string title should throw error
    "A plot",
    ["Action"],
    "R",
    "Studios",
    "John Doe",
    ["Actor One"],
    "01/01/2020",
    "2h 0min"
  );
} catch (e) {
  console.log(e);
}

try {
  const fail = await movies.createMovie(); // No parameters should throw error
} catch (e) {
  console.log(e);
}

try {
  const fail = await movies.createMovie(
    "Test Movie",
    "A plot",
    ["Action"],
    "R",
    "Studios",
    "John", // Invalid director format should throw error
    ["Actor One"],
    "01/01/2020",
    "2h 0min"
  );
} catch (e) {
  console.log(e);
}

try {
  const fail = await movies.createMovie(
    "Test Movie",
    "A plot",
    ["Action"],
    "R",
    "Studios",
    "John Doe",
    [], // Empty cast members array should throw error
    "01/01/2020",
    "2h 0min"
  );
} catch (e) {
  console.log(e);
}

try {
  const fail = await movies.createMovie(
    "Test Movie",
    "A plot",
    ["Action"],
    "R",
    "Studios",
    "John Doe",
    ["Actor One"],
    "13/45/2020", // Invalid date should throw error
    "2h 0min"
  );
} catch (e) {
  console.log(e);
}

try {
  const fail = await movies.createMovie(
    "Test Movie",
    "A plot",
    ["Action"],
    "R",
    "Studios",
    "John Doe",
    ["Actor One"],
    "01/01/2020",
    "invalid runtime" // Invalid runtime format should throw error
  );
} catch (e) {
  console.log(e);
}

// 9. Try to remove a movie that does not exist
try {
  const fail1 = await movies.removeMovie(123);
} catch (e) {
  console.log(e);
}

try {
  const fail1 = await movies.removeMovie('123');
} catch (e) {
  console.log(e);
}

try {
  const fail1 = await movies.removeMovie();
} catch (e) {
  console.log(e);
}

try {
  const fail1 = await movies.removeMovie("507f1f77bcf86cd799439999");
} catch (e) {
  console.log(e);
}

// 10. Try to rename a movie that does not exist
try {
  const fail1 = await movies.renameMovie(123, '', []);
} catch (e) {
  console.log(e);
}

try {
  const fail1 = await movies.renameMovie("507f1f77bcf86cd799439999", "New Name");
} catch (e) {
  console.log(e);
}

try {
  const fail1 = await movies.renameMovie();
} catch (e) {
  console.log(e);
}

// 11. Try to rename a movie passing in invalid data for the newName parameter
try {
  const fail1 = await movies.renameMovie(movie1._id.toString(), ""); // Empty name should throw error
} catch (e) {
  console.log(e);
}

try {
  const fail1 = await movies.renameMovie(movie1._id.toString(), 123); // Non-string name should throw error
} catch (e) {
  console.log(e);
}

try {
  const fail1 = await movies.renameMovie(movie1._id.toString(), "The Matrix Reloaded"); // Same name should throw error
} catch (e) {
  console.log(e);
}

// 12. Try getting a movie by ID that does not exist
try {
  const fail1 = await movies.getMovieById(123);
} catch (e) {
  console.log(e);
}

try {
  const fail1 = await movies.getMovieById('123');
} catch (e) {
  console.log(e);
}

try {
  const fail1 = await movies.getMovieById();
} catch (e) {
  console.log(e);
}

try {
  const fail1 = await movies.getMovieById("507f1f77bcf86cd799439999");
} catch (e) {
  console.log(e);
}

await closeConnection();
console.log('Done!');