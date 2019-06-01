/* eslint-disable no-plusplus */
/* eslint-disable no-loop-func */
const db = require('../models/dbconnection');
// const googleMapsService = require('./apikeys/googleMapsService');

const query =
  'SELECT restaurant_address FROM Restaurants WHERE restaurant_id = ?';
const queryIns =
  'UPDATE Restaurants SET restaurant_latitude = ?, restaurant_longitude = ? WHERE restaurant_id = ?';

// README: Update this for loop to match with id in database
// for (let i = 2; i < 69; i++) {
//   db.query(query, [i])
//     .then(result => {
//       console.log(result[0].restaurant_address);
//       googleMapsService
//         .geocode({ address: result[0].restaurant_address })
//         .asPromise()
//         .then(response => {
//           console.log(response.json.results[0].geometry.location.lat);
//           console.log(response.json.results[0].geometry.location.lng);
//           db.query(queryIns, [
//             response.json.results[0].geometry.location.lat,
//             response.json.results[0].geometry.location.lng,
//             i,
//           ])
//             .then(res => {
//               console.log(res);
//             })
//             .catch(err => {
//               console.log(err);
//             });
//         })
//         .catch(error => {
//           console.log(error);
//         });
//     })
//     .catch(error => {
//       console.log(error);
//     });
// }
