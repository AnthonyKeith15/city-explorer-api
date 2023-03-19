'use strict';

console.log('server');
console.log('testing')
// const { response, request } = require('express');
const cors = require('cors');
// const axios = require('axios');
const getMovies = require('./modules/movie');
const getWeather = require('./modules/weather');
const getCity = require('./modules/city');
// REQUIRE
// use require instead of import

// TODO: MODULE and Cache

//to create a server we are bringing in Express
const express = require('express');

// we need to bring in our .env file
require('dotenv').config();


// we must include cors if we want to share data.
//USE
// Assign the file a required variable (similar to reacts import)
// Express Takes Two Steps
const app = express( );
app.use(cors())

// define a PORT & validate env is working
const PORT = process.env.PORT || 3002

// if my server is on 3002 we have a problem with .env or import



app.get('/city', getCity);

app.get('/movie', getMovies);

app.get('/weather', getWeather);



app.get('*', (req, res) => {
  res.send('The resource does not exist')
})

// CLASSES (PASS IN AN OBJECT)
// Create a class that will only hold filtered data







// Error Handler
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
})
// LISTEN 
// start the server
// listen is an express method
app.listen(PORT, () => console.log(`listening on ${PORT}`))