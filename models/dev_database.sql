CREATE
OR REPLACE DATABASE 'dev_database';
CREATE
OR REPLACE USER 'res_admin' @'localhost' IDENTIFIED BY 'resPassword';
GRANT ALL PRIVILEGES ON dev_database.* TO 'res_admin' @'localhost';
USE 'dev_database';
-- Create Restaurant table
DROP TABLE IF EXISTS 'Restaurants';
CREATE TABLE 'Restaurants' (
  'restaurant_id' varchar(10) NOT NULL PRIMARY KEY,
  'name' varchar(100),
  'address' varchar(100),
  'capacity' int(11)
);
-- Create Restaurant Open Hours table
DROP TABLE IF EXISTS 'OpenHours';
CREATE TABLE 'OpenHours' (
  'restaurant_id' varchar(10) NOT NULL FOREIGN KEY REFERENCES 'Restaurants',
  'day_of_week' int(11) NOT NULL,
  'open_time' time,
  'close_time' time
);
-- Create Customers table
DROP TABLE IF EXISTS 'Customers';
CREATE TABLE 'Customers' (
  'customer_id' int(11) NOT NULL PRIMARY KEY,
  'first_name' varchar(100),
  'last_name' varchar(100),
  'email' varchar(100),
  'passwords' varchar(100)
);
-- Create Table Booking table
DROP TABLE IF EXISTS 'TableBooking';
CREATE TABLE 'TableBooking' (
  'customer_id' int(11) NOT NULL FOREIGN KEY REFERENCES 'Customers',
  'restaurant_id' varchar(10) NOT NULL FOREIGN KEY REFERENCES 'Restaurants',
  'start_time' time,
  'no_of_people' int(11),
  'status' int(11)
);
-- Create Reviews table
DROP TABLE IF EXISTS 'Reviews';
CREATE TABLE 'Reviews' (
  'review_id' int(11) NOT NULL PRIMARY KEY,
  'customer_id' int(11) NOT NULL FOREIGN KEY REFERENCES 'Customers',
  'restaurant_id' varchar(10) NOT NULL FOREIGN KEY REFERENCES 'Restaurants',
  'content' varchar(3000)
);
-- Create Restaurant Manager table
DROP TABLE IF EXISTS 'RestaurantManagers';
CREATE TABLE 'RestaurantManagers' (
  'manager_id' int(11) NOT NULL PRIMARY KEY,
  'restaurant_id' varchar(10) NOT NULL FOREIGN KEY REFERENCES 'Restaurants',
  'first_name' varchar(100),
  'last_name' varchar(100),
  'email' varchar(100),
  'passwords' varchar(100)
);