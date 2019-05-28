/* eslint-disable object-shorthand */
const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyCeWeeI2vLJDZS652QzhCzlwYW6WJpPzs8',
  Promise: Promise,
});

module.exports = googleMapsClient;
