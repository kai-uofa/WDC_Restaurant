const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = require('./apikeys/googleOpenID');
const db = require('../models/dbconnection');

const client = new OAuth2Client(CLIENT_ID);

const Customers = {
  async signUp(req, res) {
    // TODO: handle signup
  },

  async signIn(req, res) {
    let customer = null;

    // check valid customer session
    if (req.session.email !== undefined) {
      // eslint-disable-next-line prefer-destructuring
      customer = req.session.email;

      // check login details present, attempt login
    } else if (
      req.body.fields.email !== undefined &&
      req.body.fields.password !== undefined
    ) {
      const { email } = req.body.fields;
      const { password } = req.body.fields;
      db.query('SELECT * FROM Customers WHERE email = ? AND password = ? ', [
        email,
        password,
      ])
        .then(results => {
          if (results.length > 0) {
            req.session.email = email;
            customer = email;
          }
        })
        .catch(console.error);

      // If google login token present
    } else if (req.body.token !== undefined) {
      const ticket = await client
        .verifyIdToken({
          idToken: req.body.token,
          audience: CLIENT_ID,
        })
        .catch(console.error);

      const payload = ticket.getPayLoad();
      const googleID = payload.sub;

      // If google ID matches a user, save the session, and send that username
      db.query('SELECT * FROM Customers WHERE google_id = ? ', [googleID])
        .then(results => {
          if (results.length > 0) {
            req.session.email = results[0].email;
            customer = results[0].email;
          }
        })
        .catch(console.error);
    }

    if (customer !== null) {
      res.sendStatus(200); // OK
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
};

module.exports = Customers;
