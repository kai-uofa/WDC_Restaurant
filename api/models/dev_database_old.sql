-- MySQL dump 10.17  Distrib 10.3.15-MariaDB, for osx10.14 (x86_64)
--
-- Host: localhost    Database: dev_database
-- ------------------------------------------------------
-- Server version	10.3.15-MariaDB
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
--
-- Current Database: `dev_database`
--
CREATE
OR REPLACE DATABASE `dev_database`
/*!40100 DEFAULT CHARACTER SET utf8mb4 */;
--
-- Create user and grant permission for: `dev_database`
--
CREATE
OR REPLACE USER 'res_admin' @'localhost' IDENTIFIED BY 'resPassword';
GRANT ALL PRIVILEGES ON dev_database.* TO 'res_admin' @'localhost';
USE `dev_database`;
--
-- Table structure for table `Bookings`
--
DROP TABLE IF EXISTS `Bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Bookings` (
  `booking_id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) NOT NULL,
  `restaurant_id` int(11) NOT NULL,
  `date` date DEFAULT NULL,
  `start_time` time DEFAULT NULL,
  `end_time` time DEFAULT NULL,
  `no_of_people` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`booking_id`),
  KEY `fk_bookings_to_customers` (`customer_id`),
  KEY `fk_bookings_to_restaurants` (`restaurant_id`),
  CONSTRAINT `fk_bookings_to_customers` FOREIGN KEY (`customer_id`) REFERENCES `Customers` (`customer_id`),
  CONSTRAINT `fk_bookings_to_restaurants` FOREIGN KEY (`restaurant_id`) REFERENCES `Restaurants` (`restaurant_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;
--
-- Dumping data for table `Bookings`
--
LOCK TABLES `Bookings` WRITE;
/*!40000 ALTER TABLE `Bookings` DISABLE KEYS */;
/*!40000 ALTER TABLE `Bookings` ENABLE KEYS */;
UNLOCK TABLES;
--
-- Table structure for table `Customers`
--
DROP TABLE IF EXISTS `Customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Customers` (
  `customer_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `google_id` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`customer_id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `google_id` (`google_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;
--
-- Dumping data for table `Customers`
--
LOCK TABLES `Customers` WRITE;
/*!40000 ALTER TABLE `Customers` DISABLE KEYS */;
/*!40000 ALTER TABLE `Customers` ENABLE KEYS */;
UNLOCK TABLES;
--
-- Table structure for table `Managers`
--
DROP TABLE IF EXISTS `Managers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Managers` (
  `manager_id` int(11) NOT NULL AUTO_INCREMENT,
  `restaurant_id` int(11) NOT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`manager_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;
--
-- Dumping data for table `Managers`
--
LOCK TABLES `Managers` WRITE;
/*!40000 ALTER TABLE `Managers` DISABLE KEYS */;
/*!40000 ALTER TABLE `Managers` ENABLE KEYS */;
UNLOCK TABLES;
--
-- Table structure for table `Availability`
--
DROP TABLE IF EXISTS `Availability`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Availability` (
  `restaurant_id` int(11) NOT NULL,
  `date` date DEFAULT NULL,
  `start_timeframe` time DEFAULT NULL,
  `end_timeframe` time DEFAULT NULL,
  `remaining_tables` int(11) DEFAULT NULL,
  KEY `fk_availability_to_restaurants` (`restaurant_id`),
  CONSTRAINT `fk_availability_to_restaurants` FOREIGN KEY (`restaurant_id`) REFERENCES `Restaurants` (`restaurant_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;
--
-- Dumping data for table `Availability`
--
LOCK TABLES `Availability` WRITE;
/*!40000 ALTER TABLE `Availability` DISABLE KEYS */;
/*!40000 ALTER TABLE `Availability` ENABLE KEYS */;
UNLOCK TABLES;
--
-- Table structure for table `OpenHours`
--
DROP TABLE IF EXISTS `OpenHours`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `OpenHours` (
  `restaurant_id` int(11) NOT NULL,
  `day_of_week` int(11) NOT NULL,
  `open_time` time DEFAULT NULL,
  `close_time` time DEFAULT NULL,
  KEY `fk_openhours_to_restaurants` (`restaurant_id`),
  CONSTRAINT `fk_openhours_to_restaurants` FOREIGN KEY (`restaurant_id`) REFERENCES `Restaurants` (`restaurant_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;
--
-- Dumping data for table `OpenHours`
--
LOCK TABLES `OpenHours` WRITE;
/*!40000 ALTER TABLE `OpenHours` DISABLE KEYS */;
/*!40000 ALTER TABLE `OpenHours` ENABLE KEYS */;
UNLOCK TABLES;
--
-- Table structure for table `Restaurants`
--
DROP TABLE IF EXISTS `Restaurants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Restaurants` (
  `restaurant_id` int(11) NOT NULL AUTO_INCREMENT,
  `restaurant_name` varchar(100) DEFAULT NULL,
  `restaurant_address` varchar(500) DEFAULT NULL,
  `restaurant_image` varchar(500) DEFAULT NULL,
  `restaurant_description` varchar(5000) DEFAULT NULL,
  `restaurant_latitude` decimal(10, 8) DEFAULT NULL,
  `restaurant_longitude` decimal(11, 8) DEFAULT NULL,
  `restaurant_capacity` int(11) DEFAULT NULL,
  PRIMARY KEY (`restaurant_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 69 DEFAULT CHARSET = utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;
--
-- Dumping data for table `Restaurants`
--
LOCK TABLES `Restaurants` WRITE;
/*!40000 ALTER TABLE `Restaurants` DISABLE KEYS */;
INSERT INTO
  `Restaurants`
VALUES
  (
    1,
    'Osteria Oggi',
    '76 Pirie Street Adelaide, AU-SA 5000',
    'https://resizer.otstatic.com/v2/photos/large/26015575.jpg',
    'At Osteria Oggi, we cook food that we love to eat using seasonal produce, and serve it in a way that is designed to share. Pasta is made fresh daily, with a carefully chosen wine list to match.',
    -34.92544270,
    138.60259240,
    70
  ),(
    2,
    'Nido Bar & Pasta',
    '160 King William Road Hyde Park, AU-SA 5061',
    'https://images.otstatic.com/prod/26267521/1/large.jpg',
    'Nido Bar & Pasta Taking up residence in the former The Pot, Nido Bar & Pasta is a suburban aperitivo bar featuring artisanal cured meats and salumi, and bar snacks, with larger plates represented by hand-made pastas, and grilled meats. Some tables are furnished with comfortable leather-upholstered stools. If you have a particular seating request, please let us know with your booking. We will do our utmost to accommodate requests!',
    -34.95481250,
    138.59977150,
    36
  ),(
    3,
    'Anchovy Bandit',
    '96 Prospect Rd Prospect, AU-SA 5082',
    'https://resizer.otstatic.com/v2/photos/large/26071454.jpg',
    'Anchovy Bandit is a suburban Bar / Pizzeria located in Prospect. We know that the greatest Italian food is best enjoyed with friends and a bottle of wine.',
    -34.88851340,
    138.59386850,
    31
  ),(
    4,
    'The Omni Restaurant',
    '12-14 Adam St Hindmarsh, AU-SA 5007',
    'https://resizer.otstatic.com/v2/photos/large/1/26186756.jpg',
    'Modern, newly renovated restaurant with a large delicious menu. Many options to suit your entire group or family.',
    -34.90954130,
    138.57079350,
    46
  ),(
    5,
    'Johnny’s Kitchen',
    '56 Glen Osmond Road Parkside, AU-SA 5063',
    'https://images.otstatic.com/prod/26261887/3/large.jpg',
    'From traditional Indian taste A relax and comfort zone area to boosting and Dine-in.A perfect place for a gathering and throwing a party taste from various parts of indian territory. Its our commitment to use authentic genuine ingredients.',
    -34.94262250,
    138.61859650,
    75
  ),(
    6,
    'Haveli Indian Cuisine',
    '161-167 Glynburn Road Firle, AU-SA 5070',
    'https://resizer.otstatic.com/v2/photos/large/25073103.jpg',
    'The word “Haveli”refers to the Indian word for a building of historical and agricultural significance. A Haveli is a place rich with culture, tradition and an environment that brings joy and pleasure to its visitors. Here at Haveli, we aim to provide our guests with an enjoyable eating experience; combining authentic and mouth-watering flavours that Indian cuisine is renowned for, with quality service. Our warm atmosphere and classic Indian cuisine, prepared with the freshest ingredients and most exotic spices, are guaranteed to leave you wanting more. Our dishes are tasty and wholesome, designed for our guests, to display the authentic and delicious flavours Indian cuisine has to offer. Our owners and chefs bring a wealth of traditional cooking knowledge and experience to the restaurant, creating dishes that are indulgent and can be enjoyed by everyone, to provide a pleasant dining experience.',
    -34.90276700,
    138.65710390,
    31
  ),(
    7,
    'Fire & Stone Pizza-Teca',
    'Shop 2 139 Glynburn Rd Firle, AU-SA 5070',
    'https://resizer.otstatic.com/v2/photos/large/25914685.jpg',
    'A small wood-oven pizza place hiding in whats known as Adelaide\'s little Italy, the north-\'eastern suburbs. Showcasing a wide array of pizzas starting from the traditional toppings to some outrageous ones which now have an 8 year following and you can only get them at Fire & Stone.',
    -34.90150490,
    138.65694290,
    73
  ),(
    8,
    'Patumma Thai Cuisine',
    '299A Payneham Rd Royston Park, AU-SA 5070',
    'https://resizer.otstatic.com/v2/photos/large/25634600.jpg',
    'If you are looking for authentic Thai dishes cooked with real heart and soul, you have to head over to Putumma Thai cuisine.',
    -34.90039790,
    138.63535240,
    10
  ),(
    9,
    'Country Spice - Mitran Da Dhaba',
    '287E Anzac Hwy Plympton, AU-SA 5038',
    'https://resizer.otstatic.com/v2/photos/large/25621666.jpg',
    'Country Spice began as a family-owned and operated restaurant in Adelaide with the goal of delivering traditional Indian food and quick service, Originally named as Mitran Da Dhaba. We are located at 287 E, Anzac highway, Plympton SA.\nWe have vegetarian and non vegetarian main courses for everyone to choose from. For the non vegetarian choices, you can choose from Butter Chicken, Chicken Curry, chicken Tikka Masala and Madras Chicken. Eggplant Masala, Mushroom Masala, Palak Paneer and Paneer Butter Masala are among the choices for vegetarian main dishes that we offer.\nThinking of having this Indian goodness at home? It is now possible. We now accept orders placed online. We have pickup and delivery services available for orders that are placed online\nCatering also available\nUnbeatable price, Minimum 40 People and Maximum 500 People',
    -34.96424100,
    138.55400700,
    29
  ),(
    10,
    'Melt Henley',
    'Shop 5 269 Seaview Road Henley Beach, AU-SA 5022',
    'https://resizer.otstatic.com/v2/photos/large/25794729.jpg',
    'We are a vibrant sea side tapas and pizzeria restaurant located in a prime viewing location of one of South Australia\'s most popular coast lines. Henley Beach is easily accessed from all popular hubs within the city of Adelaide.\nOver looking Henley Square and rolling coast we offer a diverse series of dining and seating options to suit any occasion. Fitted with floor to ceiling windows you\'re completely surrounded by the beauty of our beach where ever you are seated.\nTogether with our chefs and Kitchen team we are in the business of facilitating a good time. We have brought the unique and established brand that is Melt, to the seaside –a premium offering of food, service, environment, the whole package - in an exceptionally fun way.',
    -34.91865790,
    138.49370260,
    51
  ),(
    11,
    'Spice N Ice Indian Restaurant',
    '103 St Vincent St Port Adelaide, AU-SA 5015',
    'https://resizer.otstatic.com/v2/photos/large/25018518.jpg',
    'The passionate team at Spice N Ice have been providing the lucky Port Adelaide locals premium Indian cuisine since 2007, and are only going from strength to strength. This elegant restaurant, along the beautiful Adelaide coastline, boasts an enticing menu with creative and unique dishes like their mouthwatering duck shank masala in a rich and creamy sauce, or spicy chilli crabs in a delectable sambal sauce, one of this Saint Vincent Street’s signature dishes. So why wait? Book a spot and start working your way through this delicious menu –it’s absolutely worth it!',
    -34.84477700,
    138.50186860,
    14
  ),(
    12,
    'Shobosho',
    '17 Leigh Street Adelaide, AU-SA 5000',
    'https://resizer.otstatic.com/v2/photos/large/25566523.jpg',
    'At Shōbōsho we blend smoke, steam, and fire. The ancient traditions of Japanese yakitori is combined with the finesse, skill & texture of all that is raw, cured, pickled and fermented.\nFrom a specially-commissioned cooking line consisting of a wood oven, hydraulic grill, rotisserie and customised yakitori pit, the element of fire speaks through simply seasoned, seared meats and vegetables.\nThe menu covers raw to cooked, with yakitori, noodles, dumplings, bao, robata grilled and spit roasted meats.\nOur bar and kitchen operates all day. From lunch, to snacks with afternoon sakes, and right into the night.',
    -34.92361820,
    138.59736810,
    57
  ),(
    13,
    'Shiki Japanese Restaurant',
    'InterContinental Hotel North Terrace Adelaide, AU-SA 5000',
    'https://resizer.otstatic.com/v2/photos/large/24095107.jpg',
    'Adelaide’s Shiki is a favourite among locals and visitors for its traditional and fresh take on Japanese Cuisine served in its inviting restaurant, located on the Upper Lobby of the luxurious five-star InterContinental Adelaide.\nFor starters, the sashimi selection or the tempura soft shell mud carb are sensational selections. Some of Shiki’s popular dishes include letting us choose for you with our range of set menu selections such as the Kayki which includes lobster tails infused with truffle butter or the Hanabi which includes seared Mt Gambier beef tenderloin steak with fried garlic and green peppercorns.\nShiki\'s Japanese green tea ice-cream with red bean sauce is the perfect dessert with which to finish your meal.',
    -34.92067900,
    138.59651100,
    52
  ),(
    14,
    'Press* Food & Wine',
    '40 Waymouth St Adelaide, AU-SA 5000',
    'https://resizer.otstatic.com/v2/photos/large/24999300.jpg',
    'At press*, we bring the best products from our patch of the earth to the table, and have fun doing it. Our kitchen is open all day for a quick bite to eat, or to settle in for a few hours. Bookings are taken for our upstairs loft area (walk-ins are welcome downstairs).',
    -34.92563670,
    138.59820280,
    24
  ),(
    15,
    'Riverside Restaurant',
    'InterContinental Adelaide North Terrace Adelaide, AU-SA 5000',
    'https://resizer.otstatic.com/v2/photos/large/24092490.jpg',
    'Modern food and a welcoming environment are the embodiment of our dishes in Riverside Restaurant, skillfully and lovingly prepared with local ingredients. Popular menu items include the Barossa pork shoulder, from locally sourced, heritage breeds that are free range and milk fed, or the Carey Gully apple-fed chicken. You can also go more healthy with the Catch of the Day or indulge in the amazing array of vegan food options, in our luxurious buffet breakfast or in our convenient $25 lunch package. We also have an extensive wine selection ranging from NV Krug Grande Cuvee Champagne to famed local Barossa Shiraz such as The Beauty from Hentley Farm. End the visit with one of our mouth-watering desserts, an espresso or a cognac.\nAs the system allows bookings of maximum 20, please explore the option of an additional booking until reaching the total amount of seats needed. Please leave your contact details for us to be in touch with you to define further info',
    -34.92067900,
    138.59651100,
    51
  ),(
    16,
    'Melt CBD',
    '38 Waymouth Street Adelaide, AU-SA 5000',
    '',
    'Melt CBD is Adelaide’s favourite tapas and pizza venue, in the heart of the city. Join us for a drink at the bar, a quick lunch or long dinner, and everything in between.\nWe are open all day, from 11am, serving up a delicious and unique selection of pizzas and a regularly updated tapas menu. Our wine list is extensive and we also offer beers on tap.\nOur first floor space is ideal for large groups and functions, or for your next corporate off-site workshop.',
    -34.92563670,
    138.59820280,
    32
  ),(
    17,
    'Malt Shovel Taphouse Adelaide',
    'Festival Centre, Festival Drive - Riverfront Adelaide, AU-SA 5000',
    '',
    'Brand new riverbank venue Malt Shovel Taphouse Adelaide will celebrate all things beer. The craft beer bar and kitchen will offer unique, authentic experiences around beloved craft beer, all in a relaxed, contemporary space. Located at the Adelaide Festival Centre at the end of the Adelaide Oval footbridge the Malt Shovel Taphouse is a riverside venue providing an escape from the hustle and bustle of the city - in the city! Whether you’re on the way to a game, enjoying a night at the theatre or simply soaking up a night on the town, rest assured our passionate staff and delicious brews, South Australian wine list and cocktails, will make your night. The best part? You can enjoy your pint with breathtaking views of the iconic Adelaide Oval and the River Torrens.',
    -34.91957100,
    138.59809300,
    23
  ),(
    18,
    'Maybe Mae',
    '15 Peel Street Adelaide, AU-SA 5000',
    'https://resizer.otstatic.com/v2/photos/large/25901337.jpg',
    'Cocktail bar in Adelaide\'s West end. You will find us in the basement of the tunnel between Peel Street and Leigh Street beneath Bread & Bone.',
    -34.92361930,
    138.59807480,
    15
  ),(
    19,
    'Five Feet Street Eats',
    '24 Waymouth St Adelaide, AU-SA 5000',
    'https://resizer.otstatic.com/v2/photos/large/25689907.jpg',
    '5 Feet Street Eat, ‘Kaki Lima’means street food. It’s name comes from the five-foot-wide sidewalks in Indonesia that are crowed with proud locals selling their traditional cuisine.\nWe are located in very busy street in Adelaide CBD.The Five Feet menu is short and simple, divided not into entrees, lunch and mains but “Quick & Run”and “If You Have a Spare Minute”.\nVego and vegan dishes are tagged “Things That We Do Not Want to Miss”.\nNo matter what you order, the emphasis is on good value and fast service. It’s the kind of place you can do lunch in 15 minutes or settle in after work for a few beers (or work your way through the all-SA wine list) with some chicken skewers, sea star dumplings, pork belly Pad Pik King or a slow-cooked Massaman Beef Brisket to share.\nChef Watcharin Chantaramad heads up the Thai side, while Sing Chaen Tielooks after all things Malaysian.',
    -34.92562150,
    138.59861130,
    13
  ),(
    20,
    'The Ballroom - InterContinental Adelaide',
    'InterContinental Adelaide North Terrace Adelaide, AU-SA 5000',
    'https://resizer.otstatic.com/v2/photos/wide-huge/3/26263780.jpg',
    'InterContinental Adelaide provides the perfect space to celebrate Christmas Day with your loved ones. Come to our elegant Ballroom and celebrate in fashion what the Festive Season is all about �spending time with family and friends.',
    -34.92067900,
    138.59651100,
    66
  ),(
    21,
    'The Atrium Lounge - InterContinental Adelaide',
    'InterContinental Adelaide Adelaide, AU-SA 5000',
    'https://images.otstatic.com/prod/26269897/2/large.jpg',
    'Come and enjoy a truly special InterContinental brunch every Sunday 9am-2pm. We have put all our passion to offer what we believe can be one of the best beverages brunch menu out there, with our unique in-house infused drinks paired with the food creations from our inspired Chefs. You are also welcome to walk in for lunch any day, 12-2pm, or for drinks and nibbles (open from 11 am daily). Finally, to show you another face of Atrium, we would love to invite you to pay homage to the working week, celebrating with a caffeine-fueled $8 espresso martini and other drinks specials while enjoying some good music from local bands at Live at the Atrium, 5pm to 8pm.',
    -34.92067900,
    138.59651100,
    77
  ),(
    22,
    'Ramen & Izakaya Himeji',
    '22 Grote St Adelaide, AU-SA 5000',
    'https://resizer.otstatic.com/v2/photos/large/25035717.jpg',
    'Ramen & Izakaya Himeji is particular about ingredients, and offers highest grade Sushi & Sashimi, Australian premium Wagyu (Platinum Label Full-Blood Wagyu which is very rare in Adelaide), and in-house made Ramen noodles.\nWe have a large range of over 50 different kinds of Sake, Shochu and Umeshu that are even rare in Japan. Yamazaki, Hibiki, Hakushu and Kakubin from World\'s No.1 award winning Suntory Whisky are available too.\nFor Sushi & Sashimi, we offer Kingfish from South Australia, local fish from Adelaide, Sea Urchin and Salmon from Tasmania, King Prawn from Western Australia, Swordfish from Queensland as well as premium seafoods such as Alfonsino, Snapper, Scampi and etc. from New Zealand which has similar climate condition to Japan.\nBlack Fin Tuna Belly, Scallop from Hokkaido, and other seafoods from Japan are also on our menu.',
    -34.92844010,
    138.59822140,
    65
  ),(
    23,
    'Henry\'s Table @ Ayers House',
    '288 North Tce Adelaide, AU-SA 5000',
    'https://resizer.otstatic.com/v2/photos/large/26071254.jpg',
    'Henry’s Table offers fine & affordable contemporary cuisine within historical Ayers House right in the heart of Adelaide\'s East End. The restaurant boasts private rooms and intimate space for groups of any size. Our wonderful Prix Fixe (fancy for set price) menus can also be enjoyed. With more than 100 SA wines to choose from and a beautifully balanced menu you will be spoilt for choice in a space designed by a renowned London designer.\nHenry\'s Bar offers small, medium and large plate food items as well as a huge selection of wine by the glass. Chesterfields and bar areas can be booked for 4 to 20 guests. The bar is open to the public and casual walk ins.',
    -34.92166700,
    138.60944400,
    68
  ),(
    24,
    'Yiasou George',
    '26 East Terrace Adelaide, AU-SA 5000',
    'https://images.otstatic.com/prod/26374484/2/large.jpg',
    'A lively Mediterranean inspired restaurant in Adelaide\'s East End. Funky tunes, wood fired eats and plenty of booze to accompany the good times!',
    -34.92248590,
    138.61059380,
    64
  ),(
    25,
    'Crack Kitchen',
    '13 Franklin St Adelaide, AU-SA 5000',
    'https://resizer.otstatic.com/v2/photos/large/25853496.jpg',
    'Formerly a Bank of Adelaide, Crack Kitchen is now focussed on quality food and coffee, serving time-poor office workers during the week and the leisurely brunch set on weekends. Coffee is seasonally roasted and blended on site from our roastery on the mezzanine level of the building. Food motto is ‘contemporary yet controversial’however we err more on the side of leading edge than bleeding edge…',
    -34.92746940,
    138.59851050,
    18
  ),(
    26,
    'West Oak Hotel',
    '208 Hindley St Adelaide, AU-SA 5000',
    'https://images.otstatic.com/prod/26200592/2/large.jpg',
    'Introducing West Oak Head Chef, John Stamatakis, formally of Midnight Spaghetti, The Travelling Table, Schnitty on a Stick and The Greek Secret.\n“The West End is experiencing a vibrant resurgence at the moment and we want our food offerings to reflect that. We are not trying to reinvent the wheel, just putting our own spin on approachable, affordable pub fare using local produce and suppliers.”\n“A selection of small and tasty bar snacks will be available all day and will match perfectly with a beer. Lunches will have a relaxed ‘cheap and cheerful’vibe to suit busy workers, hospital staff and university students and faculty. Our dinner offerings will be slightly more refined to suit the change of pace, as the work day winds up and people are able to linger into the night.”\nJohn’s familiar-but-new menu has already been exceptionally well- received, from the small plates and function catering to the diverse variety of meals. We look forward to tasting more of his magic in 2019!',
    -34.92324020,
    138.59166310,
    53
  ),(
    27,
    'Meze Mazi - Adelaide',
    '86b Prospect Road Prospect, AU-SA 5082',
    'https://resizer.otstatic.com/v2/photos/large/25018995.jpg',
    'Andrew Papadakis moved to Australia in 2013 with the vision of sharing an authentic piece of Greece through the culture of food and family.\nAt Meze-Mazi, we’re all about authenticity. Our food is derived from old family recipes and our native Greek chefs craft each dish with the same love and passion that they do for their own families.',
    -34.88936810,
    138.59387880,
    10
  ),(
    28,
    'Peter Rabbit',
    '234-244 Hindley Street Adelaide, AU-SA 5000',
    'https://resizer.otstatic.com/v2/photos/large/26071536.jpg',
    'We are an outdoor garden cafe/bar, situated in the heart of Adelaide\'s city west precinct. Our focus is to not only provide exceptional & locally sourced coffee, food & liquor',
    -34.92317400,
    138.59047800,
    41
  ),(
    29,
    'Hill of Grace Restaurant',
    'King William Road Adelaide Oval North Adelaide, AU-SA 5006',
    'https://resizer.otstatic.com/v2/photos/large/24946966.jpg',
    'Two South Australian icons join together in a unique collaboration to bring you Hill of Grace Restaurant –an exceptional dining experience overlooking Adelaide Oval’s hallowed turf.\nEach dish is carefully crafted with a strong focus on the use of locally grown, farmed or fished produce. The menu is complemented by a wine list that features more than 160 premium SA wines, headlined by the namesake Henschke Hill of Grace.\nThe collaboration with Henschke also means the restaurant is home to the world’s only complete set of Hill of Grace wines on display, a priceless collection from 1958 to the current release.',
    -34.91551630,
    138.59611460,
    66
  ),(
    30,
    'Sibling',
    '96 Gilles St Adelaide, AU-SA 5000',
    'https://resizer.otstatic.com/v2/photos/large/26020732.jpg',
    'Sibling is a 20 seat cafe in the Adelaide CBD that is doing big things despite its modest space. With their locally sourced menu of slow food frequently well reviewed, Sibling has quickly cemented its place as one of Adelaide�s go-to specialty coffee destinations.',
    -34.93392520,
    138.60391070,
    33
  ),(
    31,
    'Billy\'s Table',
    '16/18 Elizabeth Street Croydon, AU-SA 5032',
    'https://resizer.otstatic.com/v2/photos/large/26102766.jpg',
    'Connecting earth & fire Billy�s Table is a wood fire kitchen offering natural whole foods connecting the land, sea and earth with fire.',
    -34.89682270,
    138.56515690,
    24
  ),(
    32,
    'Cafe Komodo',
    '118 Prospect Rd Prospect, AU-SA 5082',
    'https://resizer.otstatic.com/v2/photos/wide-huge/25787116.jpg',
    'Cafe located on Prospect road Vegan and Gluten free options avaialble.',
    -34.88692190,
    138.59381510,
    30
  ),(
    33,
    'Pane e Latte',
    '587 Regency Road Adelaide, AU-SA 5083',
    'https://resizer.otstatic.com/v2/photos/large/25966148.jpg',
    'Pane e Latte is a suburban, award winning breakfast restaurant and our aim is to break traditional Italian culinary boundaries; blending them with local culture and produce.\nWe are located in the inner-north suburb of Broadview, 5 minutes from the busy Prospect precinct.\nNo single day goes by without a restaurant or chef touting their authenticity, creating a context that curbs creativity and discourages us from using what\'s seasonal and locally available.\nOur menu\' changes as season and demand changes, delivering unique and cutting edge options.\nAuthenticity is overrated.\nOur kitchen serves all-day breakfast Tuesday through Sunday \'til 2pm.',
    -34.87315010,
    138.61476100,
    18
  ),(
    34,
    'Ruby Rose Cucina',
    '315 The Parade Beulah, AU-SA 5067',
    'https://images.otstatic.com/prod/26374246/2/large.jpg',
    'Ruby Rose is an intimate restaurant with a focus on wholesome seasonal share style dining.',
    -34.92045120,
    138.64877630,
    10
  ),(
    35,
    'SeaSalt',
    '269 Seaview Rd Henley Beach, AU-SA 5022',
    'https://resizer.otstatic.com/v2/photos/large/25298730.jpg',
    'SeaSalt at Henley Beach showcases a unique take on high quality, fresh, local, sustainable seafood.',
    -34.91865790,
    138.49370260,
    75
  ),(
    36,
    'Mia Margarita',
    'Unit 2, 330 Seaview Road Henley Beach, AU-SA 5022',
    'https://images.otstatic.com/prod/26276343/1/large.jpg',
    'Our Henley Beach restaurant, located opposite Henley Square is a great place to stop for a margarita and a meal before or after a day at the beach. We have taco and tequila bar downstairs, a casual dining room upstairs and a private dining area to accommodate groups. Keep us in mind for private parties, corporate functions and other special occasions!',
    -34.91933940,
    138.49436890,
    55
  ),(
    37,
    'The Crafers Hotel',
    '8 Main Street Crafers, AU-SA 5152',
    'https://resizer.otstatic.com/v2/photos/large/25641177.jpg',
    'The Crafers Hotel is a French inspired bistro, offering local and seasonal produce. Our menu comprises of both French mains and classic pub fare.\nThe hotels extensive wine cellar and craft beer list ensure something for all tastes and budgets.\nOur bistro offers full table service.',
    -34.99784680,
    138.70443870,
    67
  ),(
    38,
    'Belair Hotel',
    '141 Main Road Blackwood, AU-SA 5051',
    'https://resizer.otstatic.com/v2/photos/large/25557306.jpg',
    'The Belair Hotel Bistro was specifically designed to be spacious & multi-functional aiming to meet the needs of all sorts of people, meeting for all sorts of reasons. There is a range of seating and table options available to the Bistro customer including; conventional tables, cosy booths, bar stools and a funky lounge area. Our family friendly Bistro offers a children’s menu, outdoor playground & even a dedicated child’s chill out zone, the design of which allows parents to keep an eye on their children while enjoying their dining experience. The Bistro is light and bright offering fantastic views of the Adelaide Hills. Features include a full wall of windows allowing an abundance of natural light to flood the high-ceilinged room. The Bistro also boasts a cosy fire & couches for making the most of the cooler months.',
    -35.01222670,
    138.62271250,
    54
  ),(
    39,
    'The Ottoman Grill',
    '168C Jetty Rd Glenelg, AU-SA 5045',
    'https://resizer.otstatic.com/v2/photos/large/25866923.jpg',
    'Healthy grilled food and Turkish style pizza. Fully licensed Turkish Restaurant in Glenelg, Adelaide',
    -34.98023910,
    138.51940900,
    17
  ),(
    40,
    'Acacia Henley Beach',
    '269 Seaview Road Henley Beach, AU-SA 5022',
    'https://resizer.otstatic.com/v2/photos/large/25337489.jpg',
    'Acacia is a casual yet sophisticated space, dishing comfort for everyone from the local beach bums to the visiting city dwellers. The space transforms from breakfast with OJ to dinner with Pinot seamlessly. Using a combination of subtle textures and materials to create a refined, welcoming space. Housed in an freshly Art Deco meets Mediterranean designed space, Acacia captures the casual lifestyle of Henley Beach, bringing you a unique seaside eatery experience alongside specialty coffee and a wine list.',
    -34.91865790,
    138.49370260,
    40
  ),(
    41,
    'Elly Cafe & Bistro',
    '1101 South road Melrose park Adelaide, AU-SA 5039',
    'https://resizer.otstatic.com/v2/photos/large/25898157.jpg',
    'Elly Coffee doesn\'t just roast fantastic coffee we specialise in catering. Lunch Food Vans, Mobile Coffee Vehicles. Complete Construction Site Cafe\'s!',
    -34.99153430,
    138.57508590,
    37
  ),(
    42,
    'Gather at Coriole',
    'Chaffeys Road McLaren Vale, AU-SA 5171',
    'https://resizer.otstatic.com/v2/photos/large/26146814.jpg',
    'Gather at Coriole is situated in the Courtyard of Coriole Vineyards, in one of McLaren Vale\'s most pictuesque locations, overlooking vine-studded hills and the charming Coriole Estate gardens. Head Chef Tom Tilbury has created a menu inspired by his passion for gathering wild and local ingredients, and creating unique tasting experience for diners. Guests can choose the wine paired chef\'s selection to receive an immersive dining experience highlighting the best of our Estate and local produce or select for the a la carte menu. The dynamic menu is complemented by an extensive wine list featuring current release and museum Coriole wines as well as an international selection. In May and June, we\'ll be hosting a special Sunday event - the Sunday roast. Join us on May 19th, May 26th, June 2nd and June 16th for traditional roast with all the trimmings and delicious sides.',
    -35.17872440,
    138.55333720,
    79
  ),(
    43,
    'West Henley',
    'LEVEL 1, 269 SEAVIEW ROAD HENLEY, AU-SA 5022',
    'https://images.otstatic.com/prod/26203956/3/large.jpg',
    'West is Henley Beach’s latest beachside rooftop bar, set right on Henley Square. Whether it be Saturday afternoon cocktails, sunset beers or a gin and tonic degustation, West has your fix. From a bar team whom cut their teeth at 4 X South Australian cocktail bar of the year “Maybe Mae”you can be sure the drinks are a big drawcard. A unique food offering catered by the talented kitchen team from Melt Henley will keep you nourished whilst the sun slowly dips below the horizon.',
    -34.91865800,
    138.49370300,
    23
  ),(
    44,
    'Harvest Kitchen',
    '1073 Light Pass Rd Vine Vale, AU-SA 5352',
    'https://resizer.otstatic.com/v2/photos/large/24984677.jpg',
    'Harvest Kitchen is a regional dining space focussed on providing Mediterranean inspired flavours that have been designed to be shared. We aim to offer honest, generous and flavoursome dishes based around the wonderful produce of our region, in a warm and friendly environment with relaxed and professional service.\nWe are co-located with Calabria Family Wines at the top of Magnolia Rd just outside of the township of Tanunda and our elevated aspect provides fantastic views across the valley floor. Being set amongst the vines in the heart of the region and with wide open lawn areas we provide a wonderful opportunity to escape, relax and unwind.\nHarvest Kitchen is open throughout the day serving lunch until late 7 days a week and dinner on Friday and Saturday evenings.',
    -34.52646940,
    138.99956200,
    61
  ),(
    45,
    'The Bavarian - Tee Tree Plaza',
    'Tea Tree Plaza 976 North East Rd Modbury, AU-SA 5092',
    '',
    'Our brand new, family-friendly venue located within the new dining precinct at Tea Tree Plaza will offer an unrivalled range of Bavarian food, pure imported biers and non-stop sports entertainment broadcast across several big screens.',
    -34.83062180,
    138.69213340,
    53
  ),(
    46,
    'Ember Pizza & Grill',
    '18-28 Tanunda Road Nuriootpa, AU-SA 5355',
    'https://resizer.otstatic.com/v2/photos/large/26020700.jpg',
    'We are a casual, fun and friendly restaurant based in the Barossa Valley, focused on bringing amazing pizza to the region along with a wonderful range of smoked and grill food items. Ember Pizza & Grill​is a family friendly restaurant with a relaxed atmosphere and exceptional food. With a focus on local and sustainable goods and a desire to highlight the wonderful produce and producers of our region, and state. Our aim is to bring people an honest dining experience with a connection to our community. We are located at the Provenance Barossa hub right next door to Penfolds Cellar Door and the Barossa Distilling Company, home of Barossa Gin. We have a wonderful outdoor space for dining and access to a large lawn area for kids. Our restaurant is open throughout the day and available for bookings for lunch and dinner or simply a drop in for a pizza at anytime in the afternoon.',
    -34.47933340,
    138.99176490,
    56
  ),(
    47,
    'Exquisite Indian',
    '90 Beach Road Christies Downs, AU-SA 5165',
    'https://resizer.otstatic.com/v2/photos/large/25595980.jpg',
    'Exquisite Indian is a beautiful modern Indian restaurant set in the southern suburbs of Christies Beach, just a short stroll away from the sea.',
    -35.13924750,
    138.48013530,
    21
  ),(
    48,
    'IND \'O\' MEX',
    '225 Main Road McLaren Vale, AU-SA 5171',
    'https://resizer.otstatic.com/v2/photos/large/25936777.jpg',
    'There is no love sincerer than the love of food –these are famous words by George Bernard Shaw. And this is the underlying principle Ind’O’Mex great team lives by.\nAt Ind ‘O’Mex we share an excellent exploration of India’s culture through its cuisine, Indian Food. It is hardly surprising that a nation of such complexity and sheer vastness through the definition of its national cuisine, at its best.\nCertainly, Indians are masterful with spices, blending ultimate combinations tailored to each dish.',
    -35.21263780,
    138.53400390,
    63
  ),(
    49,
    'Jumbuck\'s Restaurant',
    'Market Street Burra, AU-SA 5417',
    'https://resizer.otstatic.com/v2/photos/large/26171223.jpg',
    'Enjoy the convenience of onsite dining in our well-reviewed Jumbucks Restaurant, a warm & inviting space that opens up onto a lawned outdoor area looking out across the Burra Creek.\nAdmire the Rail Memorabilia and Australiana whilst you wine & dine with locally sourced food & wine.\nBookings advisable. Open to guests and the general public from 5:30pm most weeknights and some weekends.',
    -33.67812950,
    138.93393630,
    80
  ),(
    50,
    '1802 Oyster Bar and Bistro',
    '61 Esplanade Coffin Bay, AU-SA 5607',
    'https://resizer.otstatic.com/v2/photos/large/25626100.jpg',
    '1802 Oyster Bar is the Eyre Peninsula\'s premiere Seafood destination. We invite you to come and sit on our large outdoor deck and soak up the sea views while feasting on a delicious array of local oysters and seafood.',
    -34.62194130,
    135.47732010,
    23
  ),(
    51,
    'Caudo Vineyard',
    'Hogwash Bend Boat Rd Cadell, AU-SA 5321',
    'https://resizer.otstatic.com/v2/photos/large/25586009.jpg',
    'Caudo Vineyard is a family owned business with a passion for the environment, community, history and the Riverland lifestyle. A completely unique tourism operation in a pristine location right on the bank of the Murray River.',
    -34.06602700,
    139.83844700,
    42
  ),(
    52,
    'Amadio Wines Kangaroo Island Cellar Door',
    '1 Commercial Street Kingscote, AU-SA 5223',
    '',
    'Amadio Wines Kangaroo Island Cellar Door is located on the main street of Kingscote, Kangaroo Island. In this beautiful heritage building, our whole range of wines are available to taste and purchase, there is also the opportunity to endulge in Italian inspired dishes - rustic tapas platters, pizza and other delights. With its cosy and inviting atmopshere, this cellar door is perfect for relaxing or hosting an event.',
    -35.65499420,
    137.64020930,
    57
  ),(
    53,
    'Sean\'s Kitchen',
    'Station Road Adelaide, AU-SA 5000',
    '',
    'In 2012, Sean Connolly opened the hugely successful New York style restaurant and oyster bar, The Morrison, in the heart of Sydney�s CBD. Now, with a home-cooking product range to his name, a dedicated website and restaurant consulting arm of his brand, his attention has turned to Adelaide and Sean�s Kitchen.',
    -34.92112570,
    138.59791110,
    28
  ),(
    54,
    'Jamie\'s Italian Adelaide',
    '2 King William St. Adelaide, AU-SA 5000',
    '',
    'Jamie\'s Italian was founded in Oxford just four years ago. Since then it has grown to more than 30 restaurants worldwide, and there are already plans for even more in new towns, counties and continents around the world. But that\'s not even half the story...',
    -34.92186410,
    138.59970400,
    16
  ),(
    55,
    'Madame Hanoi',
    'North Terrace Adelaide, AU-SA 5000',
    '',
    'In a creative moment inspired by travel to exotic places and a nod to the colonial features of the physical space, Madame Hanoi was born. With a background firmly rooted in the highly technical skills of Japanese cooking, chef Nic Watt has always been',
    -34.92122180,
    138.60531990,
    13
  ),(
    56,
    'The Pot',
    '160 King William Road Hyde Park, AU-SA 5061',
    'https://resizer.otstatic.com/v2/photos/large/26025620.jpg',
    'After 20 years, we are retiring The Pot brand. We have evolved considerably over this time, from a fine dining institution (Melting Pot) to a favourite neighbourhood bistro. But we are not going anywhere. The team you know and love (Simon, Max, Chris and',
    -34.95481250,
    138.59977150,
    34
  ),(
    57,
    'Redsalt Restaurant - Adelaide',
    '16 Hindmarsh Sq Adelaide, AU-SA 5000',
    '',
    'Crowne Plaza Adelaide’s signature Redsalt Restaurant showcases the very best of contemporary South Australian cuisine in a stylish environment. Enjoy indoor or alfresco dining at this modern restaurant with views of Hindmarsh Square, a picturesque hallmark of Adelaide.\nSeasonal dishes are created using the finest locally sourced ingredients, with a focus on fresh South Australian produce. Compliment your meal with a selection of renowned local wines and beers from the extensive beverage list.',
    -34.92322490,
    138.60627830,
    31
  ),(
    58,
    'The Greek On Halifax',
    '75-79 Halifax Street Adelaide, AU-SA 5000',
    'https://resizer.otstatic.com/v2/photos/large/25798842.jpg',
    'We offer an unparalleled dining experience for locals and visitors to Adelaide. Behind our heritage-listed chimney & facade you’ll find the best restaurant in Adelaide for relaxed dining, celebrations and business lunches. During warmer months, The Greek is Adelaide’s best restaurant for alfresco dining with tables on the tree-lined street enjoying the vibrancy of its city location. Our restaurant wine list features the best of South Australian wine and is a favorite of connoisseurs. Many of our patrons frequent the restaurant for relaxing afternoons or pre-dinner drinks. The Greek is open from 10.30am weekdays and 11:30am on weekends.',
    -34.93304160,
    138.60318180,
    68
  ),(
    59,
    'Lucky Lupitas',
    '1/ 163 O\'Connell Street North Adelaide, AU-SA 5006',
    '',
    'Lucky Lupitas is a Mexican Restaurant located on the North end of O\'Connell Street in North Adelaide featuring all you favorites. Tacos, Elotes, Nachos, Burritos, Enchiladas, Fajitas and much more',
    -34.90390010,
    138.59485190,
    73
  ),(
    60,
    'Blue Cactus Mexican Diner',
    '127 Henley Beach Rd Mile End Adelaide, AU-SA 5031',
    'https://resizer.otstatic.com/v2/photos/large/25304913.jpg',
    'Funky Mexican Restaurant aiming to provide the best possible service and the tastiest food!',
    -34.92412080,
    138.56559230,
    16
  ),(
    61,
    'Magill Kitchen',
    '163-165 Magill Road Maylands, AU-SA 5069',
    'https://resizer.otstatic.com/v2/photos/large/24892949.jpg',
    'The first and last place for fine dine and takeaway for truly authentic Indian food',
    -34.91498650,
    138.63360170,
    45
  ),(
    62,
    'Penfolds Magill Estate Restaurant',
    '78 Penfold Road Magill, AU-SA 5072',
    'https://resizer.otstatic.com/v2/photos/large/24095117.jpg',
    'Located at the spiritual home of Penfolds, the restaurant is located just 8km from the city of Adelaide, approximately a 15 minute journey by car and situated adjacent to the Magill Estate Vineyard, Winery & Cellars. The restaurant combines modern architectural style with the natural attributes of its Adelaide foothills location & historic surrounds and delivers a contemporary and comfortable fine dining atmosphere. Contemporary food, an extensive collection of Penfolds wines, exemplary service and stunning views completes one of Australia’s finest food and wine experiences.',
    -34.92122660,
    138.68017630,
    54
  ),(
    63,
    'Lot 100',
    '68 Chambers Road HayValley Adelaide, AU-SA 5252',
    'https://resizer.otstatic.com/v2/photos/large/25923948.jpg',
    'The LOT. 100 kitchen is headed by Adelaide icons Tom Bubner (Pizza e Mozzarella Bar, Chicken and Pig) and Shannon Fleming (Orana Restaurant). The chefs will embrace a paddock to plate ethos, helping the team to share the stories of South Australian farming and agriculture through locally sourced ingredients. Whether enjoying a rustic Italian inspired meal from the wood fire oven or enjoying a picnic amongst the grounds, guests will be encouraged to slow down and embrace the change of pace at the LOT. 100 home. Restaurant diners can expect a al a carte menu including small plates, large plates, pasta and desserts designed to indulge individually or as a shared dining experience. For restaurant booking please book here, online. For our casual dining and bar experience please call us (08) 7077 2888 or simply walk in and join us.',
    -35.01649260,
    138.89032190,
    19
  ),(
    64,
    'The Bistro at the Stirling Hotel',
    '52 Mount Barker Rd Stirling, AU-SA 5152',
    '',
    'Menus featuring seasonal and regional Adelaide Hills produce and traditional pub fare meet modern multicultural flare across breakfast, lunch and dinner, gourmet pizzas and small sharing plates.',
    -35.00673650,
    138.71800510,
    49
  ),(
    65,
    'Beach Road Winery and Restaurant',
    '309 Seaview Rd McLaren Vale, AU-SA 5171',
    'https://resizer.otstatic.com/v2/photos/large/25271116.jpg',
    'Beach Road Wines Cellar Door and Restaurant is located in the heart of the McLaren Vale wine region, with picturesque views overlooking the township and surrounding vineyards.\nOnly minutes’drive from the township of McLaren Vale in South Australia and approximately 45 minutes’drive from Adelaide, with plenty of onsite parking.\nThe restaurant features a rustic wood oven which inspires a menu with a focus on traditional Italian style pizza and super-fresh seasonal produce.\nOur passion for Italian wines is driven by the delicious textures and flavours of these wonderful varieties. For us, being able to make wines from unconventional and unique varieties is a fantastic challenge.',
    -35.18819900,
    138.53787600,
    27
  ),(
    66,
    'The Dining Room at the Stirling Hotel',
    '52 Mt Barker Road Stirling, AU-SA 5152',
    'https://resizer.otstatic.com/v2/photos/large/24094641.jpg',
    'The Dining Room offers dining Friday to Sunday for lunch or Monday to Saturday for dinner. Located next door to The Bistro, in the heritage original dining room of the Stirling Hotel, The Dining Room offers a tranquil and cosy environment with high ceilings, leafy features and warming open fires.\nPassionate about high quality produce, our Executive Chef Brendan Boothroyd sources the best ingredients from quality Adelaide Hills and South Australian producers. The menu features from straight outs and classics through to dishes created to share and enjoy amongst friends and family.\nTo satisfy your pallet an extensive bottle wine list of more than 350 bottles includes exceptional Old World, New World and locally produced boutique wines. But don’t worry we haven’t forgotten some of your favourites by the glass as well.',
    -35.00673650,
    138.71800510,
    70
  ),(
    67,
    'Bay of Bengal',
    '73 Partridge Street Glenelg, AU-SA 5045',
    'https://resizer.otstatic.com/v2/photos/large/24092619.jpg',
    'The Bay of Bengal, THE Indian restaurant in Glenelg, possibly Adelaide was the concrete result of many dreams. Del Lacota, owner/manager, had for many years nursed a desire to have a restaurant where he could offer people an opportunity to enjoy delicious food in a pleasant atmosphere, assisted by knowledgeable and friendly staff, and at affordable prices.',
    -34.98791010,
    138.51808070,
    33
  ),(
    68,
    'Barossa Valley Brewing Brasserie',
    '2A Murray Street Tanunda, AU-SA 5352',
    'https://resizer.otstatic.com/v2/photos/large/25141397.jpg',
    'You can taste our freshest beer straight from our tasting bar seven days a week. Plus on Saturday and Sunday we host some of the Barossa�s best local musicians live in our brewery beer garden, for details of who�s playing, please check our Gig Guide.',
    -34.52978020,
    138.94921650,
    18
  );
  /*!40000 ALTER TABLE `Restaurants` ENABLE KEYS */;
UNLOCK TABLES;
--
  -- Table structure for table `Reviews`
  --
  DROP TABLE IF EXISTS `Reviews`;
  /*!40101 SET @saved_cs_client     = @@character_set_client */;
  /*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Reviews` (
    `review_id` int(11) NOT NULL AUTO_INCREMENT,
    `customer_id` int(11) NOT NULL,
    `restaurant_id` int(11) NOT NULL,
    `rating` int(11) NOT NULL,
    `content` varchar(3000) DEFAULT NULL,
    PRIMARY KEY (`review_id`),
    KEY `fk_reviews_to_customers` (`customer_id`),
    KEY `fk_reviews_to_restaurants` (`restaurant_id`),
    CONSTRAINT `fk_reviews_to_customers` FOREIGN KEY (`customer_id`) REFERENCES `Customers` (`customer_id`),
    CONSTRAINT `fk_reviews_to_restaurants` FOREIGN KEY (`restaurant_id`) REFERENCES `Restaurants` (`restaurant_id`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
  /*!40101 SET character_set_client = @saved_cs_client */;
--
  -- Dumping data for table `Reviews`
  --
  LOCK TABLES `Reviews` WRITE;
  /*!40000 ALTER TABLE `Reviews` DISABLE KEYS */;
  /*!40000 ALTER TABLE `Reviews` ENABLE KEYS */;
UNLOCK TABLES;
  /*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;
  /*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
  /*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
  /*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
  /*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
  /*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
  /*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
  /*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
-- Dump completed on 2019-05-27 22:17:23