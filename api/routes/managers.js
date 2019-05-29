/* eslint-disable no-plusplus */
const express = require('express');
const Manager = require('../controllers/managers');

const router = express.Router();

router.post('/', function(req, res, next) {
  Manager.signIn(req, res);
});

router.post('/signup', function(req, res, next) {
  Manager.signUp(req, res);
});

router.get('/', function(req, res, next) {
  if (req.session.email === undefined) {
    // TODO: check if user is a manager or not
    res.sendStatus(403);
  } else {
    // TODO: display manager home page (booking list);
    // call function to get all bookings for this req.session
  }
});

module.exports = router;
