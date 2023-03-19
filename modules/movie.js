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
    let timeToCache = 1000 * 60 * 60 * 24 * 7;
    if (cache[key] && Date.now() - cache[key].timestamp < timeToCache) {
      // if the data is already cached and it is recent enough, send the cached data
      console.log('The data is already in the cache');
      res.status(200).send(cache[key].data);
    } else {
    let searchQuery = req.query.city;
    let movieData = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&query=${searchQuery}`);
    let movieDataObject = movieData.data.results
    let trimmedMovieObjectArr = movieDataObject.map(obj => 
      new Movie(obj))
      cache[key] = {
        data: trimmedMovieObjectArr,
        timestamp: Date.now()
      }  
    res.send(trimmedMovieObjectArr);
    }
 } catch(error) {
    next(error)
  }
}

module.exports = getMovies;