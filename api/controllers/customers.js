/* eslint-disable prettier/prettier */
const { OAuth2Client } = require('google-auth-library');
const config = require ('../configAPIs');
const db = require('../models/dbconnection');

const client = new OAuth2Client(config.GOOGLE_CLIENT_ID);

const Customers = {
  async signUp(req, res) {
    let customer = null;
    let conflictEmail = false;

    if (req.session.email !== undefined) {
      customer = req.session.email;

      // check if signup details presents
    } else if (
      req.body.fields.firstName !== undefined &&
      req.body.fields.lastName !== undefined &&
      req.body.fields.email !== undefined &&
      req.body.fields.password !== undefined
      ) {
        const existedEmail = await db
          .query(
            'SELECT email FROM Customers WHERE email = ?',
            [req.body.fields.email]
          )
          .catch(console.error);

        if (existedEmail.length < 1) {
          // Add customer to database
          const query =
            'INSERT INTO Customers (first_name, last_name, email, password) VALUES (?,?,?,?)';
          db.query(query, [
            req.body.fields.firstName,
            req.body.fields.lastName,
            req.body.fields.email,
            req.body.fields.password,
          ]).catch(console.error);
          // sign-in for customer
          req.session.email = req.body.fields.email;
          customer = req.body.fields.email;
        }

      // check if google login token present
    } else if (req.body.token !== undefined) {
      const ticket = await client
        .verifyIdToken({
          idToken: req.body.token,
          audience: config.GOOGLE_CLIENT_ID,
        })
        .catch(console.error);

      const payload = ticket.getPayLoad();
      const googleID = payload.sub;

      // If google ID matches a user: add this email, name & google ID to server
      const queryG = 'INSERT INTO Customers (first_name, last_name, email, google_id)';
      db.query(queryG, [req.body.firstName, req.body.lastName, req.body.email, googleID]).catch(console.error);
      // save the session, and send that username
      req.session.email = req.body.email;
      customer = req.body.email;
    } else {
      conflictEmail = true;
    }

    if (conflictEmail === true) {
      res.sendStatus(409); // Conflict
    } else if (customer === null) {
      res.sendStatus(401); // Unauthorized
    } else {
      res.sendStatus(200);
    }
  },

  async signIn(req, res) {
    let customer = null;

    // If valid customer session
    if (req.session.email !== undefined) {
      // eslint-disable-next-line prefer-destructuring
      customer = req.session.email;

      // If login details present, attempt login
    } else if (
      req.body.fields.email !== undefined &&
      req.body.fields.password !== undefined
    ) {
      const { email } = req.body.fields;
      const { password } = req.body.fields;
      db.query('SELECT email FROM Customers WHERE email = ? AND password = ? ', [
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
          audience: config.GOOGLE_CLIENT_ID,
        })
        .catch(console.error);

      const payload = ticket.getPayLoad();
      const googleID = payload.sub;

      // If google ID matches a user, save the session, and send that username
      db.query('SELECT email FROM Customers WHERE google_id = ? ', [googleID])
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
