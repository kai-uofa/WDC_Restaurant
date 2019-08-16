/* eslint-disable no-plusplus */
const express = require('express');
const Restaurants = require('../controllers/restaurants');
const Customers = require('../controllers/customers');

const router = express.Router();

router.get('/', function(req, res, next) {
  Restaurants.searchRestaurants(req, res);
});

router.post('/quickbooking', function(req, res, next) {
  Customers.postQuickBooking(req, res);
});

module.exports = router;
