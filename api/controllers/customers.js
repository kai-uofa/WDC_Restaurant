/* eslint-disable no-multi-str */
/* eslint-disable prettier/prettier */
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const geolib = require("geolib");
const config = require("../configAPIs");
const db = require("../models/dbconnection");

const client = new OAuth2Client(config.GOOGLE_CLIENT_ID);

const Customers = {
  async _useGoogleId(req) {
    // If token id matches a google account
    const ticket = await client
      .verifyIdToken({
        idToken: req.body.token,
        audience: config.GOOGLE_CLIENT_ID
      })
      .catch(console.error);

    const payload = ticket.getPayload();
    const googleID = payload.sub;

    // check if email existed in database
    const googleAccExist = await db
      .query("SELECT email FROM Customers WHERE email = ?", [req.body.email])
      .catch(console.error);

    if (googleAccExist.length < 1) {
      // add this email, name & google ID to server
      const queryG =
        "INSERT INTO Customers (first_name, last_name, email, google_id) VALUES (?, ?, ?, ?)";
      db.query(queryG, [
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        googleID
      ]).catch(console.error);
    } else {
      // link google account
      db.query("UPDATE Customers SET google_id = ? WHERE email = ?", [
        googleID,
        req.body.email
      ]).catch(console.error);
    }
  },

  async signUp(req, res) {
    let customer = null;
    let conflictEmail = false;
    let token;

    if (req.decoded !== undefined) {
      customer = req.decoded.email;
      console.log(customer);

      // check if signup details presents
    } else if (
      req.body.firstName !== undefined &&
      req.body.lastName !== undefined &&
      req.body.email !== undefined &&
      req.body.password !== undefined
    ) {
      const existedEmail = await db
        .query("SELECT email FROM Customers WHERE email = ?", [req.body.email])
        .catch(console.error);

      if (existedEmail.length < 1) {
        // Add customer to database
        const query =
          "INSERT INTO Customers (first_name, last_name, email, password) VALUES (?,?,?,?)";
        db.query(query, [
          req.body.firstName,
          req.body.lastName,
          req.body.email,
          req.body.password
        ]).catch(console.error);
        // sign-in for customer
        token = await jwt.sign(
          {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
          },
          config.JWT_SECRET_KEY,
          {
            expiresIn: 90000
          }
        );
        customer = req.body.email;
      } else {
        conflictEmail = true;
      }

      // check if google login token present
    } else if (req.body.token !== undefined) {
      // Call function for googleID signup/signin
      await this._useGoogleId(req);

      // save the session, and send that username
      token = await jwt.sign(
        {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email
        },
        config.JWT_SECRET_KEY,
        {
          expiresIn: 90000
        }
      );
      customer = req.body.email;
    }

    if (conflictEmail === true) {
      res.sendStatus(409); // Conflict
    } else if (customer === null) {
      res.sendStatus(401); // Unauthorized
    } else {
      res.send(token);
    }
  },

  async signIn(req, res) {
    let customer = null;
    let token;

    // If valid customer session
    if (req.decoded !== undefined) {
      // eslint-disable-next-line prefer-destructuring
      customer = req.decoded.email;

      // If login details present, attempt login
    } else if (
      req.body.email !== undefined &&
      req.body.password !== undefined
    ) {
      const results = await db
        .query(
          "SELECT email FROM Customers WHERE email = ? AND password = ? ",
          [req.body.email, req.body.password]
        )
        .catch(console.error);
      // FIXME: fix this sending firstName
      if (results.length > 0) {
        token = await jwt.sign(
          {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
          },
          config.JWT_SECRET_KEY,
          {
            expiresIn: 90000
          }
        );
        customer = req.body.email;
      }
      // If google login token present
    } else if (req.body.token !== undefined) {
      // Call function for googleID signup/signin
      await this._useGoogleId(req);

      // save the session, and send that username
      token = await jwt.sign(
        {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email
        },
        config.JWT_SECRET_KEY,
        {
          expiresIn: 90000
        }
      );
      customer = req.body.email;
    }

    if (customer !== null) {
      res.send(token);
    } else {
      res.sendStatus(401); // Unauthorized
    }
  },

  async postReview(req, res) {
    const existedId = await db
      .query("SELECT customer_id FROM Customers WHERE email = ?", [
        req.body.email
      ])
      .catch(console.error);

    if (existedId.length > 0) {
      const query =
        "INSERT INTO Reviews (customer_id, restaurant_id, rating, content) VALUES (?,?,?,?)";
      await db
        .query(query, [
          existedId[0].customer_id,
          req.body.restaurant_id,
          req.body.rating,
          req.body.review
        ])
        .catch(console.error);
      res.sendStatus(200);
    } else {
      res.sendStatus(403); // Forbidden
    }
  },

  async postBooking(req, res) {
    const existedId = await db.query(
      "SELECT customer_id FROM Customers WHERE email = ?",
      [req.body.email]
    );
    if (existedId.length > 0) {
      const date = req.body.date.slice(0, 10);
      console.log(req.body);
      const query =
        "INSERT INTO Bookings (customer_id, restaurant_id, date, no_of_people, start_time, status) VALUES (?,?, ?,?,?,?)";
      db.query(query, [
        existedId[0].customer_id,
        req.body.restaurant_id,
        date,
        req.body.guests,
        req.body.time,
        req.body.status
      ])
        .then(() => {
          res.sendStatus(200);
        })
        .catch(console.error);
    } else {
      res.sendStatus(403); // Forbidden
    }
  },

  async getProfile(req, res) {
    if (req.decoded !== undefined) {
      const existedId = await db
        .query("SELECT customer_id FROM Customers WHERE email = ?", [
          req.decoded.email
        ])
        .catch(console.error);

      const userBookings = await db.query(
        "SELECT  Bookings.booking_id, Bookings.date, Bookings.start_time, Bookings.no_of_people, Restaurants.restaurant_name,Restaurants.restaurant_id,Restaurants.restaurant_image ,Customers.first_name\
        FROM ((Restaurants INNER JOIN Bookings ON Restaurants.restaurant_id=Bookings.restaurant_id)\
        INNER JOIN Customers ON Customers.customer_id=Bookings.customer_id)\
        WHERE Customers.customer_id=?",
        [existedId[0].customer_id]
      );

      res.send(userBookings);
    } else {
      res.send(401);
    }
  },

  async postQuickBooking(req, res) {
    if (req.decoded !== undefined) {
      const existedId = await db.query(
        "SELECT customer_id FROM Customers WHERE email = ?",
        [req.body.email]
      );
      // query all restaurants
      const rests = "SELECT * FROM Restaurants";
      const _dbrests = await db.query(rests);
      const restsID = [];
      // check nearby restaurant
      for (let i = 0; i < _dbrests.length; i++) {
        if (
          geolib.isPointWithinRadius(
            {
              latitude: _dbrests[i].restaurant_latitude,
              longitude: _dbrests[i].restaurant_longitude
            },
            { latitude: req.body.lat, longitude: req.body.lng },
            500
          )
        ) {
          restsID.push({ restaurant_id: _dbrests[i].restaurant_id });
        }
      }
      //booking based on rating
      // check rating
      const queryRating =
        "SELECT restaurant_id, AVG(rating) as rating FROM Reviews GROUP BY restaurant_id";
      const resultRating = await db.query(queryRating);
      const resultMatching = [];
      for (let x = 0; x < restsID.length; x++) {
        for (let i = 0; i < resultRating.length; i++) {
          if (restsID[x].restaurant_id == resultRating[i].restaurant_id) {
            resultMatching.push(resultRating[i]);
          }
        }
      }
      // console.log(restsID);
      //check if resultMatich.length>0 or <0
      // >0; return high rating
      //<0: return random restID
      const finalResult = [];
      if (resultMatching.length > 0) {
        let high = resultMatching[0].rating;
        for (let i = 0; i < resultMatching.length; i++) {
          if (resultMatching[i].rating > high) {
            high = resultMatching[i].rating;
          }
        }
        for (let i = 0; i < resultMatching.length; i++) {
          if (resultMatching[i].rating == high) {
            finalResult.push(resultMatching[i]);
          }
        }
      } else {
        finalResult.push(restsID[Math.floor(Math.random() * restsID.length)]);
      }
      // insert booking to database
      const date = req.body.date.slice(0, 10);
      const time = req.body.start_time.slice(11, 16);
      const query =
        "INSERT INTO Bookings (customer_id, restaurant_id, date, no_of_people, start_time, status) VALUES (?,?,?, ?,?,?)";
      db.query(query, [
        existedId[0].customer_id,
        finalResult[0].restaurant_id,
        date,
        req.body.no_of_people,
        time,
        req.body.status
      ]).catch(console.error);
      res.send(200);
    } else {
      res.send(401);
    }
  },

  // async deleteBooking(req, res) {
  //   if (req.decoded !== undefined) {
  //     "UPDATE Bookings\
  //     SET date = ?, no_of_people= ?, start_time=?\
  //     WHERE restaurant_id = ? ";
  //     const query = "UPDATE Bookings SET status=? WHERE ";
  //     await db.query(query, [req.body.booking_id]);
  //     const existedId = await db
  //       .query("SELECT customer_id FROM Customers WHERE email = ?", [
  //         req.decoded.email
  //       ])
  //       .catch(console.error);

  //     const userBookings = await db.query(
  //       "SELECT  Bookings.booking_id, Bookings.date, Bookings.start_time, Bookings.no_of_people, Restaurants.restaurant_name,Restaurants.restaurant_image ,Customers.first_name\
  //       FROM ((Restaurants INNER JOIN Bookings ON Restaurants.restaurant_id=Bookings.restaurant_id)\
  //       INNER JOIN Customers ON Customers.customer_id=Bookings.customer_id)\
  //       WHERE Customers.customer_id=?",
  //       [existedId[0].customer_id]
  //     );

  //     res.send(userBookings);
  //   } else {
  //     res.send(401);
  //   }
  // },

  async updateBooking(req, res) {
    if (req.decoded !== undefined) {
      const existedId = await db.query(
        "SELECT customer_id FROM Customers WHERE email = ?",
        [req.body.email]
      );
      console.log(req.body);
      res.send(200);
      const updateInfo =
        "UPDATE Bookings\
      SET date = ?, no_of_people= ?, start_time=?\
      WHERE restaurant_id = ? ";

      db.query(updateInfo, [
        req.body.date,
        req.body.guests,
        req.body.time,
        req.body.restaurant_id
      ])
        .then(() => {
          res.sendStatus(200);
        })
        .catch(console.error);
    } else {
      res.send(401);
    }
  }
};

module.exports = Customers;
