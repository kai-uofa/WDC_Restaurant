/* eslint-disable prettier/prettier */
// include the model (aka DB connection)
const db = require('../models/dbconnection');
const googleMapsService = require('./googleMapsService');

// create Restaurants class
const Manager = {
  signUp(req, res) {
    // TODO: create new restaurant => need more fields: name, add, capacity, description
    const query = 'SELECT email FROM Managers WHERE email = ?';
    db.query(query, [req.body.fields.email])
      .then( emailRes => {
        if(emailRes.length > 0) {
          res.sendStatus(409); // Conflict
        } else {
          const queryRes = 'INSERT INTO Restaurants (restaurant_name, restaurant_address) VALUES (?,?)';
          db.query(queryRes, [req.body.fields.restaurantName, req.body.fields.restaurantAdd])
            .then(() => {
              db.query('SELECT restaurant_id FROM Restaurants ORDER BY restaurant_id DESC LIMIT 1')
                .then(_resId => {
                  const _id = _resId[0].restaurant_id;
                  const queryMan = 'INSERT INTO Managers (restaurant_id, first_name, last_name, email, password) VALUES (?,?,?,?,?)';
                  db.query(queryMan, [_id, req.body.fields.firstName, req.body.fields.lastName, req.body.fields.email, req.body.fields.password])
                    .then(() => {
                      res.sendStatus(200);
                    }).catch(error => {
                      console.log(error);
                      res.sendStatus(403);
                    });
                  // call googleAPI
                  googleMapsService.geocode({ address: req.body.fields.restaurantAdd })
                    .asPromise()
                    .then(response => {
                      const queryLL = 'UPDATE Restaurants SET restaurant_latitude = ?, restaurant_longitude = ? WHERE restaurant_id = ?';
                      db.query(queryLL, [response.json.results[0].geometry.location.lat, response.json.results[0].geometry.location.lng, _id])
                        .then( (result) => {
                          console.log(result);
                        }).catch(error => { console.log(error); });
                    }).catch(error => { console.log(error); });
                }).catch(error => { console.log(error); });
            }).catch(error => { console.log(error); });
        }
      }).catch(error => { console.log(error); });
  },

  signIn(req, res) {
    const {email} = req.body.fields;
    const {password} = req.body.fields;
    if(email && password) {
      const query = 'SELECT * FROM Managers WHERE email = ? AND password = ? ';
      db.query(query, [email, password])
        .then( results => {
          if(results.length > 0){
            req.session.loggedin = true;
            req.session.email = email;
            res.sendStatus(200);
          } else {
            res.sendStatus(401); // Unauthorized
          }
        }).catch(error => { console.log(error); });
    } else {
      res.sendStatus(400); // Bad Request
    }
  }

};

module.exports = Manager;