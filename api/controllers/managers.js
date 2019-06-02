/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
/* eslint-disable object-shorthand */
const jwt = require('jsonwebtoken');
const config = require('../configAPIs');
const db = require('../models/dbconnection');
const googleMapsService = require('@google/maps').createClient({
  key: config.GOOGLE_GEOCODE_API_KEY,
  Promise: Promise,
});


// create Restaurants class
const Managers = {
  async signUp(req, res) {
    let manager = null;
    let conflict = false;
    let token;
    
    // TODO: change to JWT
    if (req.decoded !== undefined) {
      manager = req.decoded.email;
    } else if (
      req.body.firstName !== undefined && 
      req.body.lastName !== undefined && 
      req.body.email !== undefined && 
      req.body.password !== undefined && 
      req.body.resName !== undefined && 
      req.body.resAddress !== undefined &&
      req.body.capacity !== undefined
      ) {
      const existedEmail = await db.query('SELECT email FROM Managers WHERE email = ?', [req.body.email]);
      
      if (existedEmail.length < 1) {
        // create new restaurant
        const queryRes = 'INSERT INTO Restaurants (restaurant_name, restaurant_address, restaurant_capacity) VALUES (?,?,?)';
        await db.query(queryRes, [req.body.resName, req.body.resAddress, parseInt(req.body.capacity)])
          .catch(console.error);
        
        // get new restaurant id
        const _resId = await db.query('SELECT restaurant_id FROM Restaurants ORDER BY restaurant_id DESC LIMIT 1')
          .catch(console.error);

        // create new manager account
        const queryMan = 'INSERT INTO Managers (restaurant_id, first_name, last_name, email, password) VALUES (?,?,?,?,?)';
        await db.query(queryMan, [_resId[0].restaurant_id, req.body.firstName, req.body.lastName, req.body.email, req.body.password])
          .catch(console.error);
        
        token = jwt.sign({ firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email }, config.JWT_SECRET_KEY, {
          expiresIn: 1440,
        });
        manager = req.body.email;

        // call google API
        googleMapsService.geocode({ address: req.body.resAddress })
          .asPromise()
          .then(response => {

            const queryLL = 'UPDATE Restaurants SET restaurant_latitude = ?, restaurant_longitude = ? WHERE restaurant_id = ?';
            db.query(queryLL, [response.json.results[0].geometry.location.lat, response.json.results[0].geometry.location.lng, _resId[0].restaurant_id])
              .catch(console.error);

          }).catch(console.error);
        // //////////////
        if (req.body.description !== '') {
          console.log('add description to database');
        }
      } else {
        conflict = true;
      }
    }

    if( conflict === true ) {
      res.sendStatus(409); // Conflict
    } else if (manager === null) {
      res.sendStatus(401); // Unauthorized
    } else {
      res.send(token);
    }
  },

  signIn(req, res) {
    let manager = null;
    let token;

    // check valid manager session
    if (req.decoded !== undefined) {
      // eslint-disable-next-line prefer-destructuring
      manager = req.decoded.email;
    } else if (req.body.email !== undefined && req.body.password !== undefined) {
      db.query('SELECT * FROM Managers WHERE email = ? AND password = ? ', [req.body.email, req.body.password])
        .then( results => {
          if(results.length > 0) {
            token = jwt.sign({ firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email }, config.JWT_SECRET_KEY, {
              expiresIn: 1440,
            });
            manager = req.body.email;
          }
        }).catch(console.error);
    }
    
    if (manager !== null) {
      res.send(token);
    } else {
      res.sendStatus(401); // Unauthorized
    }
  },

  async managerValidation(decoded) {
    if (decoded !== undefined) {
      const results = await db.query('SELECT email FROM Managers WHERE email = ?', [decoded.email])
        .catch(console.error);
      if (results.length > 0) {
        return true;
      }
      return false;
    } 
    return false;
    
  }
};

module.exports = Managers;