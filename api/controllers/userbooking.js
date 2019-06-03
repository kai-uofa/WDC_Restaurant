const db = require("../models/dbconnection");

const UserBooking = {
  // TODO: Added info to database
  async postBooking(req, res) {
    const existedId = await db.query(
      "SELECT customer_id FROM Customers WHERE email = ?",
      [req.body.email]
    );
    const query =
      "INSERT INTO Bookings (customer_id, restaurant_id, date, no_of_people, start_time) VALUES (?,?, ?,?,?)";
    db.query(query, [
      existedId[0].customer_id,
      req.body.restaurant_id,
      req.body.date,
      req.body.guests,
      req.body.time
    ]).catch(console.error);
    res.sendStatus(200);
  }
};

module.exports = UserBooking;
