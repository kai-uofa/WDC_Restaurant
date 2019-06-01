import React, { Component } from "react";

class Reservation extends Component {
  render() {
    return (
      <div className="p-4 shadow ml-lg-4 rounded sticky-top">
        <h5 className="text-center">Restaurant Name</h5>
        <hr className="my-4" />
        <form id="booking-form" method="" action="#" className="form">
          <div className="form-group mb-4">
            <label htmlFor="bookingDate" className="form-label">
              Choose a date *
            </label>
            <div className="datepicker-container datepicker-container-right">
              <input
                type="text"
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
              Choose time *
            </label>
            <select name="time" id="time" className="form-control">
              <option value="1">noon</option>
              <option value="2">1</option>
              <option value="3">2</option>
              <option value="4">3</option>
            </select>
          </div>
          <div className="form-group mb-4">
            <label htmlFor="guests" className="form-label">
              Guests *
            </label>
            <select name="guests" id="guests" className="form-control">
              <option value="1">1 Guest</option>
              <option value="2">2 Guests</option>
              <option value="3">3 Guests</option>
              <option value="4">4 Guests</option>
            </select>
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
