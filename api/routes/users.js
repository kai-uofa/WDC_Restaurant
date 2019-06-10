const express = require('express');
const Customers = require('../controllers/customers');
const Bookings = require('../controllers/bookings');

const router = express.Router();

router.post('/review', async function(req, res, next) {
  if (await Customers.userValidation(req.decoded)) {
    Customers.postReview(req, res);
  } else {
    res.sendStatus(403); // Forbidden
  }
});

router.post('/reservation', function(req, res, next) {
  Customers.postBooking(req, res);
});

router.get('/profile', function(req, res, next) {
  Bookings.getActiveBookings(req, res);
});

router.post('/deletebooking', function(req, res, next) {
  Bookings.updateBookingStatus(req, res);
});

router.post('/updatebooking', function(req, res, next) {
  Bookings.updateBookingDetails(req, res);
});
// TODO: handle and update profile users

module.exports = router;
