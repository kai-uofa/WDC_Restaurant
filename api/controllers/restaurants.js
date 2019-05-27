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
      const q = `%${  req.query.q}%`;
      const query = 'SELECT * FROM Restaurants WHERE restaurant_name LIKE (?) OR restaurant_address LIKE (?)';
      db.query(query, [q,q])
        .then(results => {
              res.json(results);
        }).catch(error => {console.log(error);
      });
    } else {
      // TODO: return all restaurant base on location
      const query = 'SELECT * FROM Restaurants';
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
  // function to get restaurant details from id
  getRestaurantDetails(req, res) {
    if ('res_id' in req.query) {
      const q = req.query.res_id;
      const query = 'SELECT * FROM Restaurants WHERE restaurant_id LIKE (?)';
      db.query(query, [q])
        .then(results => {
          res.json(results);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      res.json({});
    }
  }
};

module.exports = Restaurants;
