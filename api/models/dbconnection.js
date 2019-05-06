// Using ECMAScript prior to 2017
const mariadb = require('mariadb');

const port = process.env.PORT || 4205;

let connection;

if (port === 4205) {
  connection = mariadb
    .createConnection({
      host: 'localhost',
      port: 3306,
      database: 'dev_database',
      user: 'res_admin',
      password: 'resPassword',
    })
    .then(conn => {
      console.log(
        `connected to ${conn.database} ! connection id is ${conn.threadId}`
      );
    })
    .catch(err => {
      console.log(`not connected due to error: ${err}`);
    });
} else {
  connection = mariadb
    .createConnection({
      host: 'localhost',
      port: 3306,
      database: 'live_database',
      user: 'res_admin',
      password: 'resPassword',
    })
    .then(conn => {
      console.log(
        `connected to ${conn.database} ! connection id is ${conn.threadId}`
      );
    })
    .catch(err => {
      console.log(`not connected due to error: ${err}`);
    });
}

module.exports = connection;
