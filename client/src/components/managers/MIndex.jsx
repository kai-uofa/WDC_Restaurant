import React, { Component } from "react";
import axios from 'axios';

class MIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeBookings: [],
    }
  }

  statusChange(booking, event) {
    axios
      .post('/managers/status', {
        customer_id: booking.customer_id,
        restaurant_id: booking.restaurant_id,
        no_of_people: booking.no_of_people,
        start_time: booking.start_time,
        status: parseInt(event.target.value)
      })
      .then(res => {
        // TODO: handle server response codes 200, 401
        console.log(res);
      })
      .catch(console.error);
  };

  componentWillMount() {
    axios
      .get('/managers')
      .then(res => {
        this.setState({
          activeBookings: res.data
        });
      })
      .catch(console.error);
  }

  render() {
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
            {this.state.activeBookings.map(booking => (
              <li>
                <button>updateInfo</button>
                <div>{booking.first_name}</div>
                <div>{booking.last_name}</div>
                <div>{booking.no_of_people}</div>
                <div>{booking.start_time}</div>
                <select 
                  name='status'
                  onChange={(event) => this.statusChange(booking, event)}>
                  <option selected value="1">Active</option>
                  <option value="2">Finished</option>
                  <option value="3">Canceled</option>
                </select>
              </li>
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default MIndex;