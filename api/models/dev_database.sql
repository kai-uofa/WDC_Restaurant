-- Create database
CREATE
OR REPLACE DATABASE `dev_database`;
-- Create user & grant privileges
CREATE
OR REPLACE USER 'res_admin' @'localhost' IDENTIFIED BY 'resPassword';
GRANT ALL PRIVILEGES ON dev_database.* TO 'res_admin' @'localhost';
-- Use database
USE `dev_database`;
-- Create Restaurant table
CREATE
OR REPLACE TABLE `Restaurants` (
  `restaurant_id` varchar(10) NOT NULL PRIMARY KEY,
  `restaurant_name` varchar(100),
  `restaurant_phone` varchar(11),
  `restaurant_address` varchar(100),
  `restaurant_latitude` varchar(20),
  `restaurant_longitude` varchar(20),
  `restaurant_capacity` int(11),
  `restaurant_description` varchar(3000)
);
-- Insert value to Restaurants table
LOCK TABLES `Restaurants` WRITE;
INSERT INTO
  `Restaurants`
VALUES
  (
    '1',
    'Restaurant A',
    '0412345678',
    'This is the address',
    'lati 8748937425',
    'long 3246329756',
    '20',
    'This is the description'
  ),
  (
    '2',
    'Restaurant B',
    '0412345678',
    'This is the address',
    'lati 8748937425',
    'long 3246329756',
    '20',
    'This is the description'
  ),
  (
    '3',
    'Restaurant C',
    '0412345678',
    'This is the address',
    'lati 8748937425',
    'long 3246329756',
    '20',
    'This is the description'
  ),
  (
    '4',
    'Restaurant A',
    '0412345678',
    'This is the address',
    'lati 8748937425',
    'long 3246329756',
    '20',
    'This is the description'
  );
UNLOCK TABLES;
-- Create Restaurant Open Hours table
  CREATE
  OR REPLACE TABLE `OpenHours` (
    `restaurant_id` varchar(10) NOT NULL,
    `day_of_week` int(11) NOT NULL,
    `open_time` time,
    `close_time` time,
    CONSTRAINT `fk_openhours_to_restaurants` FOREIGN KEY (restaurant_id) REFERENCES Restaurants(restaurant_id) ON DELETE CASCADE
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
-- Create Customers table
  CREATE
  OR REPLACE TABLE `Customers` (
    `customer_id` int(11) AUTO_INCREMENT NOT NULL PRIMARY KEY,
    `first_name` varchar(100),
    `last_name` varchar(100),
    `email` varchar(100) UNIQUE KEY,
    `password` varchar(100)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
-- Create Table Booking table
  CREATE
  OR REPLACE TABLE `Booking` (
    `customer_id` int(11) NOT NULL,
    `restaurant_id` varchar(10) NOT NULL,
    `start_time` time,
    `no_of_people` int(11),
    `status` int(11),
    CONSTRAINT `fk_booking_to_customers` FOREIGN KEY (customer_id) REFERENCES Customers(customer_id),
    CONSTRAINT `fk_booking_to_restaurants` FOREIGN KEY (restaurant_id) REFERENCES Restaurants(restaurant_id)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
-- Create Reviews table
  CREATE
  OR REPLACE TABLE `Reviews` (
    `review_id` int(11) AUTO_INCREMENT NOT NULL PRIMARY KEY,
    `customer_id` int(11) NOT NULL,
    `restaurant_id` varchar(10) NOT NULL,
    `content` varchar(3000),
    CONSTRAINT `fk_reviews_to_customers` FOREIGN KEY (customer_id) REFERENCES Customers(customer_id),
    CONSTRAINT `fk_reviews_to_restaurants` FOREIGN KEY (restaurant_id) REFERENCES Restaurants(restaurant_id) ON DELETE CASCADE
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
-- Create Restaurant Manager table
  CREATE
  OR REPLACE TABLE `Managers` (
    `manager_id` int(11) AUTO_INCREMENT NOT NULL PRIMARY KEY,
    `restaurant_id` varchar(10) NOT NULL,
    `first_name` varchar(100),
    `last_name` varchar(100),
    `email` varchar(100) UNIQUE KEY,
    `password` varchar(100)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;