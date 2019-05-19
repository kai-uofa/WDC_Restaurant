// Using ECMAScript prior to 2017
const mariadb = require('mariadb');

const port = process.env.PORT || 5000;

let pool;

if (port === 5000) {
  pool = mariadb.createPool({
    host: 'localhost',
    port: 3306,
    database: 'dev_database',
    user: 'res_admin',
    password: 'resPassword',
  });
} else {
  pool = mariadb.createPool({
    host: 'localhost',
    port: 3306,
    database: 'live_database',
    user: 'res_admin',
    password: 'resPassword',
  });
}

module.exports = pool;
