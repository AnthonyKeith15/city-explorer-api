'use strict'
const axios = require('axios');

let cache = {
  // store cached data in here
}

// class to structure the data
class Movie{
  constructor(movieObject){
    this.title = movieObject.title,
    this.description = movieObject.overview,
    this.imageURL = movieObject.poster_path
  }
}


let getMovies = async (req, res, next) => {
  try {
   
    let searchQuery = req.query.city;
    let movieData = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&query=${searchQuery}`);
    let movieDataObject = movieData.data.results
    let trimmedMovieObjectArr = movieDataObject.map(obj => 
      new Movie(obj))
     
    res.send(trimmedMovieObjectArr);
    
 } catch(error) {
    next(error)
  }
}

module.exports = getMovies;