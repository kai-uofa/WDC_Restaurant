import React, { Component } from "react";
import Content from "./MIndexContent";
import axios from "axios";

class MIndex extends Component {
  state = {
    bookings: []
  };

  handleStatusChange = (booking, event) => {
    axios
      .post("/managers/status", {
        booking_id: booking.booking_id,
        status: parseInt(event.target.value)
      })
      .then(res => {
        this.setState({ bookings: res.data });
      })
      .catch(console.error);
  };

  handleDetailUpdate = (booking, state) => {
    // check null
    
  }

  componentDidMount() {
    axios
      .get("/managers")
      .then(res => {
        this.setState({ bookings: res.data });
      })
      .catch(console.error);
  }

  render() {
    return (
      <div className="container">
        <div className="row userCard">
          {this.state.bookings
            .slice(0)
            .reverse()
            .map(booking => (
              <Content
                key={booking.booking_id}
                booking={booking}
                handleStatusChange = {this.handleStatusChange}
                handleDetailUpdate = {this.handleDetailUpdate}
              />
            ))}
        </div>
      </div>
    );
  }
}

export default MIndex;
