CREATE
OR REPLACE DATABASE 'dev_database';
CREATE
OR REPLACE USER 'res_admin' @'localhost' IDENTIFIED BY 'resPassword';
GRANT ALL PRIVILEGES ON dev_database.* TO 'res_admin' @'localhost';