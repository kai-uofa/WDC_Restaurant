const express = require('express');

const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('hello');
});

// TODO: this is fo handling user profile management

module.exports = router;
