/* eslint-disable no-plusplus */
const express = require('express');

const router = express.Router();

const restaurants = [
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
];

router.get('/', function(req, res, next) {
  if ('q' in req.query) {
    // If so, search the titles and descriptions of restaurants for a match
    const results = [];
    const q = req.query.q.toLowerCase();
    for (let i = 0; i < restaurants.length; i++) {
      if (
        restaurants[i].name.toLowerCase().includes(q) ||
        restaurants[i].description.toLowerCase().includes(q)
      ) {
        results.push(restaurants[i]);
      }
    }

    // Send matching restaurants
    res.json(results);
  } else {
    // Otherwise send all restaurants
    res.json(restaurants);
  }
});

module.exports = router;
