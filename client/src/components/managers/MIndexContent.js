import React, { Component } from "react";
import moment from "moment";
import axios from "axios";
import jwtDecode from "jwt-decode";

class MIndexContent extends Component {
  state = {
    date: null,
    time: null,
    guests: null
  };

  // handleOnSubmit = e => {
  //   e.preventDefault();
  //   axios
  //     .post("/managers/details", {
  //       date: this.state.date,
  //       time: this.state.time,
  //       guests: this.state.guests,
  //       email: this.state.user.email,
  //       restaurant_id: this.props.review.restaurant_id
  //     })
  //     .then(res => {
  //       window.location = "/managers";
  //     })
  //     .catch(console.error);
  //   console.log(this.state);
  // };

  componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      this.setState({ user });
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    return (
      <div className=" col-xl-3 col-lg-6 col-md-12 mb-5 ">
        <div className="card profile">
          <img
            src={this.props.review.restaurant_image}
            className="card-img-top imageProfile"
            alt={this.props.review.restaurant_name}
          />

          <div className="card-body">
            <h5 className="card-title">Hello {this.props.review.first_name}</h5>
            <p className="card-text">
              Your booing details with <br />
              <strong>{this.props.review.restaurant_name}</strong>
            </p>
          </div>

          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              Date: {moment(this.props.review.date).format("MM/DD/YYYY")}
            </li>
            <li className="list-group-item">
              Start: {this.props.review.start_time}
            </li>
            <li className="list-group-item">
              Number of people: {this.props.review.no_of_people} people
            </li>

            {/* Update Info users */}
            <li className="list-group-item btnDU d-flex">
              <button
                type="button"
                className="btn btn-primary btnUpdate"
                data-toggle="modal"
                data-target="#exampleModalCenter"
              >
                Update
              </button>

              <div
                className="modal fade"
                id="exampleModalCenter"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
              >
                <div
                  className="modal-dialog modal-dialog-centered"
                  role="document"
                >
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalCenterTitle">
                        Update Profile
                      </h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <form id="booking-form" method="post" className="form">
                        <div className="form-group mb-4">
                          <label htmlFor="bookingDate" className="form-label">
                            Choose a date:
                          </label>
                          <div className="datepicker-container datepicker-container-right">
                            <input
                              name="date"
                              type="date"
                              id="bookingDate"
                              placeholder="Choose your dates"
                              required="required"
                              className="form-control"
                              value={this.props.booking.date}
                              onChange={event =>
                                this.setState({ date: event.target.value })
                              }
                            />
                          </div>
                        </div>
                        <div className="form-group mb-4">
                          <label htmlFor="time" className="form-label">
                            Choose time:
                          </label>
                          <input
                            type="time"
                            name="time"
                            className="form-control"
                            value={this.props.booking.time}
                            onChange={event =>
                              this.setState({ time: event.target.value })
                            }
                          />
                        </div>
                        <div className="form-group mb-4">
                          <label htmlFor="guests" className="form-label">
                            Guests:
                          </label>
                          <input
                            type="number"
                            name="guests"
                            className="form-control"
                            value={this.props.booking.guests}
                            onChange={event =>
                              this.setState({ guests: event.target.value })
                            }
                          />
                        </div>
                      </form>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={() => this.props.handleDetailUpdate(this.props.booking, this.state)}
                      >
                        Save changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* End of updating users */}
              {/* <button
                className="btn btn-outline-danger btnDelete"
                onClick={() => this.props.handleOnDelete(this.props.review)}
              >
                Delete
              </button> */}
              <select
                className='btn btn-outline-danger btnDelete'
                onChange={event => this.props.handleStatusChange(this.props.booking, event)}
              >
                <option selected value="1">Active</option>
                <option value="2">Finished</option>
                <option value="3">Canceled</option>
              </select>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default MIndexContent;
