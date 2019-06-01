/* eslint-disable no-plusplus */
const express = require('express');
const Managers = require('../controllers/managers');
const Bookings = require('../controllers/bookings');

const router = express.Router();

router.post('/signin', function(req, res, next) {
  Managers.signIn(req, res);
});

router.post('/signup', function(req, res, next) {
  Managers.signUp(req, res);
});

router.post('/signout', function(req, res, next) {
  Managers.signOut(req, res);
});

router.get('/', function(req, res, next) {
  if (req.decoded !== undefined) {
    Bookings.getActiveBookings(req, res);
  } else {
    res.sendStatus(403); // Forbidden
  }
});

router.post('/status', function(req, res, next) {
  if (req.decoded !== undefined) {
    Bookings.updateBookingStatus(req, res);
  } else {
    res.sendStatus(403); // Forbidden
  }
});

router.post('/start', function(req, res, next) {
  if (req.decoded !== undefined) {
    Bookings.updateBookingTime(req, res);
  } else {
    res.sendStatus(403); // Forbidden
  }
});

router.post('/people', function(req, res, next) {
  if (req.decoded !== undefined) {
    Bookings.updateBookingPeople(req, res);
  } else {
    res.sendStatus(403); // Forbidden
  }
});

// TODO: This is to handle managers' profile & restaurant management

module.exports = router;
