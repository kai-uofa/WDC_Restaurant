import React, { Component } from "react";
import axios from "axios";

class Reservation extends Component {
  state = {
    date: localStorage.getItem("date") || null,
    time: localStorage.getItem("time") || null,
    guests: localStorage.getItem("guests") || null
  };

  handleOnSubmit = e => {
    e.preventDefault();
    if (this.props.user === undefined) {
      this.props.history.push({
        pathname: "/signin",
        state: { from: this.props.history.location }
      });
    } else {
      axios
        .post("/users/reservation", {
          date: this.state.date,
          time: this.state.time,
          guests: this.state.guests,
          email: this.props.user.email,
          restaurant_id: this.props.detail.restaurant_id,
          status: 1
        })
        .then(res => {
          this.props.history.push({
            pathname: "/profile"
          });
        })
        .catch(console.error);
      localStorage.removeItem("date");
      localStorage.removeItem("time");
      localStorage.removeItem("guests");
    }
  };

  render() {
    return (
      <div className="p-4 shadow ml-lg-4 rounded sticky-top">
        <h5 className="text-center">{this.props.detail.restaurant_name}</h5>
        <hr className="my-4" />
        <form
          id="booking-form"
          method="post"
          className="form"
          onSubmit={this.handleOnSubmit}
        >
          <div className="form-group mb-4">
            <label htmlFor="bookingDate" className="form-label">
              Choose a date:
            </label>
            <div className="datepicker-container datepicker-container-right">
              <input
                name="date"
                type="date"
                onChange={event => {
                  const date = event.target.value;
                  localStorage.setItem("date", date);
                  this.setState({ date });
                }}
                id="bookingDate"
                placeholder="Choose your dates"
                value={this.state.date}
                required="required"
                className="form-control"
              />
            </div>
          </div>
          <div className="form-group mb-4">
            <label htmlFor="time" className="form-label">
              Choose time:
            </label>
            <input
              onChange={event => {
                const time = event.target.value;
                localStorage.setItem("time", time);
                this.setState({ time });
              }}
              value={this.state.time}
              type="time"
              name="time"
              className="form-control"
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="guests" className="form-label">
              Guests:
            </label>
            <input
              onChange={event => {
                const guests = parseInt(event.target.value);
                localStorage.setItem("guests", guests);
                this.setState({ guests });
              }}
              type="number"
              name="guests"
              value={this.state.guests}
              className="form-control"
            />
          </div>
          <div className="form-group text-center">
            <button type="submit" className="btn btn-primary">
              Make a Reservation
            </button>
          </div>
        </form>
        <hr className="my-4" />
      </div>
    );
  }
}

export default Reservation;
