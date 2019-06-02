/* eslint-disable no-multi-str */
const db = require('../models/dbconnection');

const Bookings = {
  async getActiveBookings(req, res) {
    const resId = await db
      .query('SELECT restaurant_id FROM Managers WHERE email = ?', [
        req.decoded.email,
      ])
      .catch(console.error);
    // get all ACTIVE bookings from database
    if (resId.length > 0) {
      const query =
        'SELECT \
Customers.customer_id, \
Customers.first_name, \
Customers.last_name, \
Bookings.no_of_people, \
Bookings.date, \
Bookings.start_time, \
Bookings.restaurant_id \
FROM Customers \
INNER JOIN Bookings ON Customers.customer_id = Bookings.customer_id \
WHERE Bookings.restaurant_id = ? AND Bookings.status = 1';
      db.query(query, [resId[0].restaurant_id])
        .then(results => {
          res.json(results);
        })
        .catch(console.error);
    } else {
      res.json({ Error: 'Restaurant not found' });
    }
  },

  async updateBookingStatus(req, res) {
    if (req.body !== undefined) {
      db.query(
        'UPDATE Bookings SET status = ? WHERE customer_id = ? AND restaurant_id = ? AND date = ? AND start_time = ?',
        [
          req.body.status,
          req.body.customer_id,
          req.body.restaurant_id,
          req.body.date,
          req.body.start_time,
        ]
      ).catch(console.error);

      let change = req.body.no_of_people;
      if (req.body.status === 1) {
        change = -change;
      }
      // FIXME: this need to be fix to make sure it update Bookings & Availability tables correctly
      // take current time => update remaining tables for all the next time frame of the day
      // db.query(
      //   'UPDATE Availability SET remaining_tables = (remaining_tables + ?) WHERE restaurant_id = ? AND start_timeframe <= ? AND end_timeframe >= ?',
      //   [change, currentTime, currentTime]
      // ).catch(console.error);
      res.sendStatus(200);
    } else {
      res.sendStatus(400); // Bad Request
    }
  },

  async updateBookingTime(req, res) {
    //
  },

  async updateBookingPeople(req, res) {
    //
  },
};

module.exports = Bookings;
