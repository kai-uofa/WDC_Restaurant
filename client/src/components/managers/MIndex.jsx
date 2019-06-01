import React from "react";
import axios from 'axios';

const list = [
  {
    id: 'a',
    firstname: 'Robin',
    lastname: 'Wieruch',
    year: 1988,
  },
  {
    id: 'b',
    firstname: 'Dave',
    lastname: 'Davidds',
    year: 1990,
  },
];

const ListItem = ({ item }) => (
  <li>
    <div>{item.id}</div>
    <div>{item.firstname}</div>
    <div>{item.lastname}</div>
    <div>{item.year}</div>
  </li>
);

const MIndex = () => {
  return (
    <React.Fragment>
      <div className="container">
        <div className="row my-5">
          <div className="col-sm-8">
            <p className="subtitle letter-spacing-4 mb-1 mt-5 text-shadow">
              RESTAURANT NAME
            </p>
            <h4>Bookings Management</h4>
          </div>
        </div>
        <div className="col">
          {list.map(item => (
            <ListItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}

export default MIndex;