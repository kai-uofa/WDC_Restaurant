/* eslint-disable prettier/prettier */
// include the model (aka DB connection)
const db = require('../models/dbconnection');

// create Restaurants class
const Manager = {
  signUp(req, res) {
    // TODO: create new restaurant => need fields: restaurant name, address
    const queryRes = 'INSERT INTO Restaurants (restaurant_name, restaurant_address) VALUES (?,?)';
    db.query(queryRes, [req.body.fields.restaurantName, req.body.fields.restaurantAdd])
      .then( () => {
        // query get restaurant ID
      })
      .catch(error => {
        console.log(error);
      });
    const queryMan = 'INSERT INTO Managers (restaurant_id, first_name, last_name, email, password) VALUES (?,?,?,?,?)';
    db.query(queryMan, [1,req.body.fields.firstName, req.body.fields.lastName, req.body.fields.email, req.body.fields.password])
      .then( () => {
        res.send(200);
      })
      .catch(error => {
        console.log(error);
        res.sendStatus(403);
      });
  }

  
};

module.exports = Manager;