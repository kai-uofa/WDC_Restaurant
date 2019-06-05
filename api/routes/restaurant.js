const express = require("express");
const Restaurants = require("../controllers/restaurants");
const router = express.Router();

router.get("/", function(req, res, next) {
  Restaurants.getRestaurantDetails(req, res);
});

router.post("/reviews", function(req, res, next) {
  Restaurants.getReviews(req, res);
});

module.exports = router;
