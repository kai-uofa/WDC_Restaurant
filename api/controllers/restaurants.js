/* eslint-disable prettier/prettier */
// include the model (aka DB connection)
const db = require('../models/dbconnection');

// create Restaurants class
const Restaurants = {
  // function to search restaurants
  searchRestaurants(req, res) {
    // This is a shortcut to get a connection from pool, execute a query and release connection.
    // https://mariadb.com/kb/en/library/connector-nodejs-promise-api/#poolgetconnection-promise
    if ('q' in req.query) {
      const q = `%${  req.query.q}`;
      const query = 'SELECT * FROM Restaurants WHERE restaurant_name LIKE (?)';
      db.query(query, [q])
      .then(results => {
          res.json(results);
      })
      .catch(error => {
          console.log(error);
          res.json({});
      });
    } else {
      // TODO: return all restaurant base on location
      const query = 'SELECT * FROM Restaurants ';
      db.query(query)
      .then(results => {
        res.json(results);
      })
      .catch(error=> {
        console.log(error);
        res.json({});
      });
    }
  },
};

module.exports = Restaurants;
