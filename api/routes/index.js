const express = require("express");
const Customers = require("../controllers/customers");

const router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "WDC Restaurant ABC" });
});

router.post("/signup", function(req, res, next) {
  Customers.signUp(req, res);
});

router.post("/signin", function(req, res, next) {
  Customers.signIn(req, res);
});

router.post("/signout", function(req, res, next) {
  Customers.signOut(req, res);
});

module.exports = router;
