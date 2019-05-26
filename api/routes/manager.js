/* eslint-disable no-plusplus */
const express = require('express');
const Manager = require('../controllers/manager');

const router = express.Router();

// router.get('/signin', function(req, res, next) {
//   Restaurants.searchRestaurants(req, res);
// });

router.post('/signup', function(req, res, next) {
  Manager.signUp(req, res);
});

module.exports = router;
