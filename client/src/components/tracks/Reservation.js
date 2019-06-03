import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

class Reservation extends Component {
  state = {
    date: null,
    time: null,
    guests: null
  };

  handleOnSubmit = e => {
    e.preventDefault();
    if (this.props.user === undefined) {
      // window.location = "/signin";
      this.props.history.push("/signin");
      // return <Redirect push to="/" />;
    } else {
      axios
        .post("/reservation", {
          date: this.state.date,
          time: this.state.time,
          guests: this.state.guests,
          email: this.props.user.email,
          restaurant_id: this.props.detail.restaurant_id
        })
        .then(res => {
          console.log(res);
        })
        .catch(console.error);
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
                onChange={event => this.setState({ date: event.target.value })}
                name="bookingDate"
                id="bookingDate"
                placeholder="Choose your dates"
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
              onChange={event => this.setState({ time: event.target.value })}
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
              onChange={event =>
                this.setState({ guests: parseInt(event.target.value) })
              }
              type="number"
              name="guests"
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
