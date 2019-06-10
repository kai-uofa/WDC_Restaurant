/* eslint-disable no-multi-str */
const db = require("../models/dbconnection");

const Bookings = {
  async getActiveBookingsM(req, res) {
    const resId = await db
      .query("SELECT restaurant_id FROM Managers WHERE email = ?", [
        req.decoded.email
      ])
      .catch(console.error);

    // get all ACTIVE bookings from database
    if (resId.length > 0) {
      const query =
        "SELECT \
Customers.customer_id, \
Customers.first_name, \
Customers.last_name, \
Bookings.no_of_people, \
Bookings.date, \
Bookings.start_time, \
Bookings.restaurant_id, \
Bookings.booking_id, \
Restaurant.restaurant_image \
FROM Customers \
INNER JOIN Bookings ON Customers.customer_id = Bookings.customer_id \
INNER JOIN Restaurants ON Bookings.restaurant_id = Restaurants.restaurant_id \
WHERE Bookings.restaurant_id = ? AND Bookings.status = 1";
      db.query(query, [resId[0].restaurant_id])
        .then(results => {
          res.json(results);
        })
        .catch(console.error);
    } else {
      res.json({ Error: "Restaurant not found" });
    }
  },

  async getActiveBookings(req, res) {
    const cusId = await db
      .query("SELECT customer_id FROM Customers WHERE email = ?", [
        req.decoded.email
      ])
      .catch(console.error);

    // get all ACTIVE bookings from database
    if (cusId.length > 0) {
      const query =
        "SELECT \
Customers.customer_id, \
Customers.first_name, \
Customers.last_name, \
Bookings.no_of_people, \
Bookings.date, \
Bookings.start_time, \
Bookings.restaurant_id, \
Bookings.booking_id, \
Restaurants.restaurant_image ,\
Restaurants.restaurant_name \
FROM Customers \
INNER JOIN Bookings ON Customers.customer_id = Bookings.customer_id \
INNER JOIN Restaurants ON Bookings.restaurant_id = Restaurants.restaurant_id \
WHERE Bookings.customer_id = ? AND Bookings.status = 1";
      db.query(query, [cusId[0].customer_id])
        .then(results => {
          res.json(results);
        })
        .catch(console.error);
    } else {
      res.status(403).json({ Error: "Customer not found" });
    }
  },

  async updateBookingStatus(req, res) {
    if (req.body !== undefined) {
      await db
        .query("UPDATE Bookings SET status = ? WHERE booking_id = ?", [
          req.body.status,
          req.body.booking_id
        ])
        .catch(console.error);
      this.getActiveBookings(req, res);
    } else {
      res.sendStatus(400); // Bad Request
    }
  }
};

module.exports = Bookings;
