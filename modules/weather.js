'use strict'
const axios = require('axios');

let cache = {
  // store cached data in here
}

class Forecast{
  constructor(weatherObject){
    this.date = weatherObject.datetime,
    this.high = weatherObject.high_temp,
    this.low = weatherObject.low_temp
  }
}

let getWeather = async (req, res, next) => {
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
}

module.exports = getWeather;