/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
/* eslint-disable object-shorthand */
// include the model (aka DB connection)
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
    
    if (req.session.email !== undefined) {
      manager = req.session.email;
    } else if (
      req.body.fields.firstName !== undefined && 
      req.body.fields.lastName !== undefined && 
      req.body.fields.email !== undefined && 
      req.body.fields.password !== undefined && 
      req.body.fields.restaurantName !== undefined && 
      req.body.fields.restaurantAdd !== undefined
      ) {
      const existedEmail = await db.query('SELECT email FROM Managers WHERE email = ?', [req.body.fields.email]);
      
      if (existedEmail.length < 1) {
        const queryRes = 'INSERT INTO Restaurants (restaurant_name, restaurant_address) VALUES (?,?)';
        db.query(queryRes, [req.body.fields.restaurantName, req.body.fields.restaurantAdd])
          .then(() => {
            // get new restaurant id
            db.query('SELECT restaurant_id FROM Restaurants ORDER BY restaurant_id DESC LIMIT 1')
              .then(_resId => {
                
                // create new manager account
                const queryMan = 'INSERT INTO Managers (restaurant_id, first_name, last_name, email, password) VALUES (?,?,?,?,?)';
                db.query(queryMan, [_resId[0].restaurant_id, req.body.fields.firstName, req.body.fields.lastName, req.body.fields.email, req.body.fields.password])
                  .then(() => {
                    req.session.email = req.body.fields.email;
                    manager = req.body.fields.email;
                  }).catch(console.error);

                // call google API
                googleMapsService.geocode({ address: req.body.fields.restaurantAdd })
                  .asPromise()
                  .then(response => {

                    const queryLL = 'UPDATE Restaurants SET restaurant_latitude = ?, restaurant_longitude = ? WHERE restaurant_id = ?';
                    db.query(queryLL, [response.json.results[0].geometry.location.lat, response.json.results[0].geometry.location.lng, _resId[0].restaurant_id])
                      .then((result) => {
                        console.log(result);
                      }).catch(console.error);

                  }).catch(console.error);

              }).catch(console.error);

          }).catch(console.error);
      } else {
        conflict = true;
      }
    }

    if( conflict === true ) {
      res.sendStatus(409); // Conflict
    } else if (manager === null) {
      res.sendStatus(401); // Unauthorized
    } else {
      res.sendStatus(200);
    }
  },

  signIn(req, res) {
    let manager = null;

    // check valid manager session
    if (req.session.email !== undefined) {
      // eslint-disable-next-line prefer-destructuring
      manager = req.session.email;
    } else if (req.body.fields.email !== undefined && req.body.fields.password !== undefined) {
      const { email } = req.body.fields;
      const { password } = req.body.fields;
      db.query('SELECT * FROM Managers WHERE email = ? AND password = ? ', [email, password])
        .then( results => {
          if(results.length > 0) {
            req.session.email = email;
            manager = email;
          }
        }).catch(console.error);
    }
    
    if (manager !== null) {
      res.sendStatus(200);
    } else {
      res.sendStatus(401); // Unauthorized
    }
  },

  signOut(req, res) {
    if (req.session.email !== undefined) {
      delete req.session.email;
    }

    res.sendStatus(200);
  },

  getAllBookings(req, res) {
    // TODO: get all ACTIVE bookings from database
    // 
  }
};

module.exports = Managers;