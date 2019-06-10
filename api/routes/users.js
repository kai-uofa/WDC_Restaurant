const express = require("express");
const Customers = require("../controllers/customers");

const router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("hello");
});

router.post("/review", function(req, res, next) {
  Customers.postReview(req, res);
});

router.post("/reservation", function(req, res, next) {
  Customers.postBooking(req, res);
});

router.get("/profile", function(req, res, next) {
  Customers.getProfile(req, res);
});
router.post("/deletebooking", function(req, res, next) {
  Customers.deleteBooking(req, res);
});
router.post("/updatebooking", function(req, res, next) {
  Customers.updateBooking(req, res);
});
// TODO: handle and update profile users

module.exports = router;
