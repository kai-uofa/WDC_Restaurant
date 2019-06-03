const express = require("express");

const router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("hello");
});

// TODO: handle and update profile users

module.exports = router;
