const express = require('express');
const Restaurants = require('../controllers/restaurants');

const router = express.Router();

router.get('/', function(req, res, next) {
  Restaurants.getRestaurantDetails(req, res);
});

module.exports = router;
