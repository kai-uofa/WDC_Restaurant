/* eslint-disable no-unused-vars */
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const session = require("express-session");
const uuid = require("uuid/v4");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const searchRouter = require("./routes/search");
const managerRouter = require("./routes/managers");
const restRouter = require("./routes/restaurant");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// FIXME: Redirect to HTTPS connection
app.use(function(req, res, next) {
  if (!/https/.test(req.protocol)) {
    res.redirect(
      `https://${req.hostname}:${req.socket.localPort + 443}${req.url}`
    );
  } else {
    return next();
  }
});

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    genid: req => uuid(), // use UUIDs for session IDs
    secret: "The very secret keyword of WDC",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  })
);

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/search", searchRouter);
app.use("/managers", managerRouter);
app.use("/restaurant", restRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
