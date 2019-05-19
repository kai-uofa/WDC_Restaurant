/* eslint-disable no-plusplus */
const express = require('express');
const Restaurants = require('../controllers/restaurants');

const router = express.Router();

router.get('/', function(req, res, next) {
  Restaurants.searchRestaurants(req, res);
});

router.post('/', function(req, res, next) {
  // call something
});

module.exports = router;
