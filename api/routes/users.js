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

router.post('/reservation', async function(req, res, next) {
  if (await Customers.userValidation(req.decoded)) {
    Customers.postBooking(req, res);
  } else {
    res.sendStatus(403); // Forbidden
  }
});

router.get('/profile', async function(req, res, next) {
  if (await Customers.userValidation(req.decoded)) {
    Bookings.getActiveBookings(req, res);
  } else {
    res.sendStatus(403); // Forbidden
  }
});

router.post('/deletebooking', async function(req, res, next) {
  if (await Customers.userValidation(req.decoded)) {
    Bookings.updateBookingStatus(req, res);
  } else {
    res.sendStatus(403); // Forbidden
  }
});

router.post('/updatebooking', async function(req, res, next) {
  if (await Customers.userValidation(req.decoded)) {
    Bookings.updateBookingDetails(req, res);
  } else {
    res.sendStatus(403); // Forbidden
  }
});
// TODO: handle and update profile users

module.exports = router;
