# WDC Restaurants
A restaurant booking web application that allows users to book tables at restaurants, and restaurants to manage their bookings

## Authors
- Kien Nguyen (a1735829@student.adelaide.edu.au)
- 
- 
- 

## Setup Environment
1. Install MariaDB: https://myuni.adelaide.edu.au/courses/45380/pages/mariadb-setup-guide
2. Create user and database:  
Open a terminal, go to project root and run the following:  
`mysql.server start`  
`mysql -u root < models/live_database.sql`  
**NOTE**: for development, use dev_database.sql  
3. Install NodeJS: https://nodejs.org/en/download/package-manager/#windows
- For better development, it is recommended to install [Nodemon](https://github.com/remy/nodemon)  
`npm install -g nodemon`
4. Start server:  
- Live Environment: `npm start` (PORT: 3000)
- Development Environment: `npm run dev` (PORT: 4205)