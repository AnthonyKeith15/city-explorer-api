'use strict';

console.log('server');
console.log('testing')
const { response, request } = require('express');
const cors = require('cors');
const axios = require('axios');
// REQUIRE
// use require instead of import

// TODO: MODULE and Cache

//to create a server we are bringing in Express
const express = require('express');

// we need to bring in our .env file
require('dotenv').config();


let data = require('./data/weather.json')

// we must include cors if we want to share data.
//USE
// Assign the file a required variable (similar to reacts import)
// Express Takes Two Steps
const app = express( );
app.use(cors())

// define a PORT & validate env is working
const PORT = process.env.PORT || 3002

// if my server is on 3002 we have a problem with .env or import

app.get('/city', async (req, res, next) => {
  try {
    let searchQuery = req.query.city;
    let cityData = await axios.get(`https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${searchQuery}&format=json`);
    let cityDataObject = cityData.data[0];
    let cityDataToSend = new City(cityDataObject);
    res.send(cityDataToSend);
 } catch(error) {
    next(error)
  }
});

app.get('/movie', async (req, res, next) => {
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
});
app.get('/weather', async (req, res, next) => {
  try {
    let searchQuery = req.query;
    let weatherData = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${searchQuery.lat}&lon=${searchQuery.lon}&key=${process.env.REACT_APP_WEATHERBIT_API_KEY}&days=5`);
    let weatherDataArr = weatherData.data.data;
    let trimmedWeatherDataArr = weatherDataArr.map(obj => 
      new Forecast(obj)
    );    
    res.send(trimmedWeatherDataArr);
 } catch(error) {
    next(error)
  }
});



app.get('*', (req, res) => {
  res.send('The resource does not exist')
})

// CLASSES (PASS IN AN OBJECT)
// Create a class that will only hold filtered data
class City{
  constructor(cityObject){
    this.name = cityObject.display_name,
    this.lat = cityObject.lat,
    this.lon = cityObject.lon
  }
}

class Movie{
  constructor(movieObject){
    this.title = movieObject.title,
    this.description = movieObject.overview,
    this.imageURL = movieObject.poster_path
  }
}

class Forecast{
  constructor(weatherObject){
    this.date = weatherObject.datetime,
    this.high = weatherObject.high_temp,
    this.low = weatherObject.low_temp
  }
}



// Error Handler
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
})
// LISTEN 
// start the server
// listen is an express method
app.listen(PORT, () => console.log(`listening on ${PORT}`))