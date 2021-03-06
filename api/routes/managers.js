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

router.get('/', async function(req, res, next) {
  if (await Managers.managerValidation(req.decoded)) {
    Bookings.getActiveBookingsM(req, res);
  } else {
    res.sendStatus(403); // Forbidden
  }
});

router.post('/status', async function(req, res, next) {
  if (await Managers.managerValidation(req.decoded)) {
    Bookings.updateBookingStatus(req, res);
    Bookings.getActiveBookingsM(req, res);
  } else {
    res.sendStatus(403); // Forbidden
  }
});

router.post('/details', async function(req, res, next) {
  if (await Managers.managerValidation(req.decoded)) {
    Bookings.updateBookingDetails(req, res);
  } else {
    res.sendStatus(403); // Forbidden
  }
});

// TODO: This is to handle managers' profile & restaurant management

module.exports = router;
