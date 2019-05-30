/* eslint-disable no-multi-str */
const db = require('../models/dbconnection');

const Bookings = {
  async getActiveBookings(req, res) {
    const resId = await db
      .query('SELECT restaurant_id FROM Managers WHERE email = ?', [
        req.session.email,
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
          Bookings.start_time, \
          Bookings.restaurant_id, \
        FROM Customers \
        INNER JOIN Bookings ON Customers.customer_id = Bookings.customer_id \
        WHERE Bookings.restaurant_id = ? AND Bookings.status = 1';
      db.query(query, [resId[0]])
        .then(results => {
          // TODO: set end time before response. default: 2 hours
          res.json(results);
        })
        .catch(console.error);
    } else {
      res.json({ Error: 'Restaurant not found' });
    }
  },

  async updateBookingStatus(req, res) {
    // TODO: double check request body format
    if (req.body !== undefined) {
      db.query(
        'UPDATE Bookings SET status = ? WHERE customer_id = ? AND start_time = ?',
        [status, customer_id, start_time]
      ).catch(console.error);

      let change = people;
      if (req.body.status === 1) {
        change = -change;
      }
      // take current time => update remaining tables for all the next time frame of the day
      db.query(
        'UPDATE Availability SET remaining_tables = remaining_tables + ? WHERE restaurant_id = ? AND start_timeframe <= ? AND end_timeframe >= ?',
        [change, currentTime, currentTime]
      ).catch(console.error);
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
