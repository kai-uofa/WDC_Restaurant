import React, { Component } from "react";
import moment from "moment";
import axios from "axios";
import jwtDecode from "jwt-decode";

class Profilecontent extends Component {
  state = {
    date: "",
    time: "",
    guests: "",
  };

  componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      this.setState({ user });
    } catch (error) {
      console.log(error);
    }
  }
  
  handleOnClick = e => {
    localStorage.setItem("bookingID", this.props.review.booking_id);
    localStorage.setItem("bookingDate", moment(this.props.review.date).format("YYYY-MM-DD"));
    localStorage.setItem("bookingTime", this.props.review.start_time);
    localStorage.setItem("bookingGuests", this.props.review.no_of_people);
  };

  handleOnSubmit = e => {
    let date, time, guests;
    if (this.state.date === '') {
      date = localStorage.getItem('bookingDate');
    } else {
      date = this.state.date;
    }
    if (this.state.time === '') {
      time = localStorage.getItem('bookingTime');
    } else {
      time = this.state.time;
    }
    if (this.state.guests === '') {
      guests = localStorage.getItem('bookingGuests');
    } else {
      guests = this.state.guests;
    }
    axios
      .post("/users/updatebooking", {
        date: date,
        time: time,
        guests: guests,
        email: this.state.user.email,
        booking_id: localStorage.getItem("bookingID")
      })
      .then(res => {
        window.location = "/profile";
      })
      .catch(console.error);
  };

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
                onClick={this.handleOnClick}
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
                        Update Booking
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
                            // value={localStorage.getItem('bookingGuests')}
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
                        onClick={e => this.handleOnSubmit(e)}
                      >
                        Save changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* End of updating users */}
              <button
                className="btn btn-outline-danger btnDelete"
                onClick={() => this.props.handleOnDelete(this.props.review)}
              >
                Delete
              </button>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Profilecontent;

// const Profilecontent = props => {
//   return (

//   );
// };

// export default Profilecontent;
