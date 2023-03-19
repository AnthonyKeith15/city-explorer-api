'use strict'
const axios = require('axios');



class City{
  constructor(cityObject){
    this.name = cityObject.display_name,
    this.lat = cityObject.lat,
    this.lon = cityObject.lon
  }
}

let getCity = async (req, res, next) => {
  try {
      let searchQuery = req.query.city;
      let cityData = await axios.get(`https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${searchQuery}&format=json`);
      let cityDataObject = cityData.data[0];
      let cityDataToSend = new City(cityDataObject);

      
      res.send(cityDataToSend).status(200);
    
 } catch(error) {
    next(error)
  }
}


module.exports = getCity;