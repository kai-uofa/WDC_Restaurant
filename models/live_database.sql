CREATE
OR REPLACE DATABASE 'live_database';
CREATE
OR REPLACE USER 'res_admin' @'localhost' IDENTIFIED BY 'resPassword';
GRANT ALL PRIVILEGES ON live_database.* TO 'res_admin' @'localhost';
-- TODO: Add live data to this database before submit