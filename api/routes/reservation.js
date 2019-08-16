const express = require('express');
const UserBooking = require('../controllers/userbooking');

const router = express.Router();

router.post('/', function(req, res, next) {
  UserBooking.postBooking(req, res);
});

module.exports = router;
