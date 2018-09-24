var axios = require('axios');


function getLatLng(location) {
  return axios.get('https://www.mapquestapi.com/geocoding/v1/address', {
    params: {
      key: process.env.GEO_KEY,
      location: location,
    }
  })
  .then(function (response) {
    return response.data.results[0].locations[0].latLng;
  })
}

function getRestaurants(latLng) {
  var config = {
    headers: {
      'user-key': process.env.ZOMATO_KEY,
      Accept: 'application/json',
    },
    params: {
      lat: latLng.lat,
      lon: latLng.lng,
      q: 'vegan',
      radius: 8000,
      sort: 'real_distance'
    }
  };
  
  return axios.get('https://developers.zomato.com/api/v2.1/search', config)
    .then(function(response) {
      return response.data.restaurants;
    });
}

function handleError (error) {
  console.warn(error);
  return null;
}

module.exports = {
  getLatLng: getLatLng,
  getRestaurants: getRestaurants,
  handleError: handleError,
};