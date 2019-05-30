/* eslint-disable no-plusplus */
/* eslint-disable prettier/prettier */
// include the model (aka DB connection)
const geolib = require('geolib');
const db = require('../models/dbconnection');

// create Restaurants class
const Restaurants = {
  // function to search restaurants
  searchRestaurants(req, res) {
    // This is a shortcut to get a connection from pool, execute a query and release connection.
    // https://mariadb.com/kb/en/library/connector-nodejs-promise-api/#poolgetconnection-promise
    if ('search' in req.query && 'lat' in req.query && 'lng' in req.query) {
      const search = `%${req.query.search}%`;
      const { lat } = req.query;
      const { lng } = req.query;
      const query = 'SELECT * FROM Restaurants WHERE restaurant_name LIKE (?)';
      db.query(query, [search])
        .then(_dbres => {
          const results = [];
          if (lat === 'null' && lng === 'null') {
            res.json(_dbres);
          } else {
            for (let i = 0; i < _dbres.length; i++) {
              if (
                geolib.isPointWithinRadius(
                  {
                    latitude: _dbres[i].restaurant_latitude,
                    longitude: _dbres[i].restaurant_longitude
                  },
                  { latitude: lat, longitude: lng },
                  1000
                )
              ) {
                results.push(_dbres[i]);
              }
            }
            res.json(results);
          }
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      res.sendStatus(400); // Bad Request
    }
  },

  // function to get restaurant details from id
  getRestaurantDetails(req, res) {
    if ('res_id' in req.query) {
      const q = req.query.res_id;
      const query = 'SELECT * FROM Restaurants WHERE restaurant_id = ?';
      db.query(query, [q])
        .then(results => {
          res.json(results);
        }).catch(console.error);
    } else {
      res.sendStatus(400); // Bad Request
    }
  }
};

module.exports = Restaurants;
