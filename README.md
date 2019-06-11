# WDC Restaurants
A restaurant booking web application that allows users to book tables at restaurants, and restaurants to manage their bookings

## Authors
- Kien Nguyen (a1735829@student.adelaide.edu.au)
- Dat Le (a1730614@student.adelaide.edu.au)
- Kien Tang (a1738166@student.adelaide.edu.au)
- Zhao Ming Soh (a1751699@student.adelaide.edu.au)

## Setup Environment
1. Install MariaDB: https://myuni.adelaide.edu.au/courses/45380/pages/mariadb-setup-guide
2. Create user and database:  
Open a terminal, go to project root and run the following:  
`mysql.server start`  
`mysql -u root < models/dev_database.sql`  
**NOTE**: 
for live version, use live_database.sql 
to dump database: `mysqldump -u root -p --databases dev_database > dev_database_new.sql`
3. Start server:  
- Go to api folder
- Install node_modules `npm install`
- Run server: `npm start` (PORT: 5000)
4. Start front end:
- Go to client folder
- Install node_modules `npm install`
- Run server: `npm start` (PORT: 3000)
