const express = require("express");
const Customers = require("../controllers/customers");
const Bookings = require("../controllers/bookings");

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
  Bookings.getActiveBookings(req, res);
});
router.post("/deletebooking", function(req, res, next) {
  Bookings.updateBookingStatus(req, res);
});
router.post("/updatebooking", function(req, res, next) {
  Customers.updateBooking(req, res);
});
// TODO: handle and update profile users

module.exports = router;
