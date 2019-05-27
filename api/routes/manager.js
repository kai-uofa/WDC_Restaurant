/* eslint-disable no-plusplus */
const express = require('express');
const Manager = require('../controllers/manager');

const router = express.Router();

router.post('/', function(req, res, next) {
  Manager.signIn(req, res);
});

router.post('/signup', function(req, res, next) {
  Manager.signUp(req, res);
});

router.get('/', function(req, res, next) {
  // TODO: display manager home page (booking list)
  // TODO: check login status
});

module.exports = router;
