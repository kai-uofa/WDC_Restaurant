/* eslint-disable prettier/prettier */
// include the model (aka DB connection)
const db = require('../models/dbconnection');

// create Restaurants class
const Restaurants = {
  all: [
    {
      id: 1,
      name: 'Pizza Hub',
      description: 'One a day keeps the doctor away.',
      image: '/images/apple-256268__340.jpg',
      price: 3.99,
      quantity: 10,
    },
    {
      id: 2,
      name: 'Chitturi Heritage',
      description: 'The most delicious of citrus.',
      image: '/images/tangerines-1721590__340.jpg',
      price: 5.49,
      quantity: 30,
    },
    {
      id: 3,
      name: 'Saffron Restaurant',
      description: 'More like RAWBERRY.',
      image: '/images/strawberries-3359755__340.jpg',
      price: 4.99,
      quantity: 20,
    },
    {
      id: 4,
      name: 'Royal Dine',
      description: 'Boat.',
      image: '/images/bananas-1119790__340.jpg',
      price: 6.99,
      quantity: 50,
    },
    {
      id: 5,
      name: 'Hotel Deves Midway',
      description: 'Makes great Jam.',
      image: '/images/apricots-2523272__340.jpg',
      price: 4.49,
      quantity: 40,
    },
    {
      id: 6,
      name: 'Blueberries',
      description: 'Something something superfood.',
      image: '/images/blueberries-690072__340.jpg',
      price: 5.49,
      quantity: 60,
    },
  ],

  // function to search restaurants
  searchRestaurants(req, res) {
    // TODO: create query here: http://stayregular.net/blog/make-a-nodejs-api-with-mysql
    if ('q' in req.query) {
      const q = req.query.q.toLowerCase();
      // eslint-disable-next-line prettier/prettier
      // eslint-disable-next-line no-useless-escape
      const query = 'SELECT * FROM Restaurants WHERE restaurant_name LIKE ?';
      db.query(query, [q], function(error, results, fields) {
        if (error) {
          console.log(error);
          res.json({});
        }
        res.json(results);
      });
    } else {
      // TODO: return all restaurant base on location
      const query = 'SELECT * FROM Restaurants ';
      db.query(query, function(error, results, fields) {
        if (error) {
          console.log(error);
          res.json({});
        }
        res.json(results);
      });
    }
  },
};

module.exports = Restaurants;
