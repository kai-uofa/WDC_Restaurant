// Using ECMAScript prior to 2017
const mariadb = require('mysql');

const port = process.env.PORT || 5000;

let connection;

if (port === '5000') {
  connection = mariadb.createConnection({
    host: 'localhost',
    port: 3306,
    database: 'dev_database',
    user: 'res_admin',
    password: 'resPassword',
  });
} else {
  connection = mariadb.createConnection({
    host: 'localhost',
    port: 3306,
    database: 'live_database',
    user: 'res_admin',
    password: 'resPassword',
  });
}

module.exports = connection;
