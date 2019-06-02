const db = require("../models/dbconnection");

const UserBooking = {
  async postBooking(req, res) {
    const existedId = await db
      .query("SELECT customer_id FROM Customers WHERE email = ?", [
        req.body.email
      ])
      .catch(console.error);
    // const query =
    //   "INSERT INTO Bookings (customer_id, no_of_people, restaurant_id, start_time) VALUES (?,?,?,?)";
    // db.query(query, [
    //   existedEmail,
    //   req.body.guests,
    //   req.body.restaurant_id,
    //   req.body.time
    // ]).catch(console.error);
    // console.log(existedEmail);
    console.log(existedId);
    res.sendStatus(200);
  }
};

module.exports = UserBooking;
