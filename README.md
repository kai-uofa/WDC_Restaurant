[![Board Status](https://dev.azure.com/kien0826/169ad40f-2afe-4fe6-8d17-dc5ea03f7a9d/a8ab2c65-cf36-4d7b-acd5-8c7629a402f2/_apis/work/boardbadge/d18caf2e-6876-46d0-a677-ed0b1d18d6e1)](https://dev.azure.com/kien0826/169ad40f-2afe-4fe6-8d17-dc5ea03f7a9d/_boards/board/t/a8ab2c65-cf36-4d7b-acd5-8c7629a402f2/Microsoft.RequirementCategory)

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
