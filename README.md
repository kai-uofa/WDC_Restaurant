# WDC Restaurants
A restaurant booking web application that allows users to book tables at restaurants, and restaurants to manage their bookings

# Authors
1. Trung Kien Nguyen (a1735829@student.adelaide.edu.au)
2. 
3. 
4. 

# Setup Environment
1. Install MariaDB: https://myuni.adelaide.edu.au/courses/45380/pages/mariadb-setup-guide
2. Create user and database:
Open a terminal, go to project root and run the following:
'''
mysql.server start
mysql -u root < models/live_database.sql
'''
NOTE: for development, use dev_database.sql