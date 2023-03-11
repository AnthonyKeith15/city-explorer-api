'use strict';

console.log('server');
console.log('testing')
const { response, request } = require('express');
// REQUIRE
// use require instead of import

//to create a server we are bringing in Express
const express = require('express');

// we need to bring in our .env file
require('dotenv').config();


let data = require('./data/weather.json')
//USE
// Assign the file a required variable (similar to reacts import)
// Express Takes Two Steps
const app = express( );

// define a PORT & validate env is working
const PORT = process.env.PORT || 3002

// if my server is on 3002 we have a problem with .env or import

// ROUTES 
// we will use these to access our endpoints

// define our default route
// the first argument is a URL in quotes
// the second is the callback that defines what should happen  when a request comes into that url
app.get('/', (req, res) => {
  res.send('Hello From Our Server')
});

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