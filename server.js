'use strict';

console.log('server');
console.log('testing')
const { response, request } = require('express');
const cors = require('cors');
// REQUIRE
// use require instead of import

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

// ROUTES 
// we will use these to access our endpoints


// the first argument is a URL in quotes
// the second is the callback that defines what should happen  when a request comes into that url

// example request: http:localhost:3001?city={this.state.userCityChoice}
app.get('/?', (req, res, next) => {
  try {
    let userCity = req.query.city;
    let forecastObject = data.find(obj => obj.city_name === userCity);
    let forecastObjectData = forecastObject.data
    let cityObject = forecastObjectData.map(obj => 
      new Forecast(obj))
    res.send(cityObject);

    //res.send(selectedForecast);
 } catch(error) {
    next(error)
  }
  // res.send(data)
});

app.get('/movie', (req, res, next) => {
  try {
    let userCity = req.query.movieSearch;
    console.log(userCity)
    res.send(userCity)
    
    // res.send(cityObject);

    //res.send(selectedForecast);
 } catch(error) {
    next(error)
  }
  // res.send(data)
});

app.get('*', (req, res) => {
  res.send('The resource does not exist')
})

// CLASSES (PASS IN AN OBJECT)
// Create a class that will only hold filtered data

class Forecast{
  constructor(cityObject){
    this.date = cityObject.datetime;
    this.description = cityObject.weather.description;
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