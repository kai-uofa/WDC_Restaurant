/* eslint-disable no-plusplus */
const express = require('express');
const Manager = require('../controllers/managers');
const Bookings = require('../controllers/bookings');

const router = express.Router();

router.post('/signin', function(req, res, next) {
  Manager.signIn(req, res);
});

router.post('/signup', function(req, res, next) {
  Manager.signUp(req, res);
});

router.get('/', function(req, res, next) {
  if (Manager.managerValidation(req.session.email)) {
    Bookings.getActiveBookings(req, res);
  } else {
    res.sendStatus(403); // Unauthorized
  }
});

router.post('/status', function(req, res, next) {
  if (Manager.managerValidation(req.session.email)) {
    Bookings.updateBookingStatus(req, res);
  } else {
    res.sendStatus(403);
  }
});

router.post('/start', function(req, res, next) {
  if (Manager.managerValidation(req.session.email)) {
    Bookings.updateBookingTime(req, res);
  } else {
    res.sendStatus(403);
  }
});

router.post('/people', function(req, res, next) {
  if (Manager.managerValidation(req.session.email)) {
    Bookings.updateBookingPeople(req, res);
  } else {
    res.sendStatus(403);
  }
});

module.exports = router;
