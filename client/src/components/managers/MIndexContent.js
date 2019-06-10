import React, { Component } from "react";
import moment from "moment";
import axios from "axios";
import jwtDecode from "jwt-decode";

class MIndexContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment(this.props.review.date).format("YYYY-MM-DD"),
      time: this.props.review.start_time,
      guests: this.props.review.no_of_people,
    }
  }

  handleOnClick = () => {
    axios
      .post("/managers/details", {
        date: this.state.date,
        time: this.state.time,
        guests: this.state.guests,
        email: this.state.user.email,
        booking_id: this.props.review.booking_id
      })
      .then(res => {
        window.location = "/profile";
      })
      .catch(console.error);
  }
  
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
            <h5 className="card-title">{this.props.review.first_name} {this.props.review.last_name}</h5>
          </div>

          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <label htmlFor="bookingDate" className="form-label">
                Date:
              </label>
              <div className="datepicker-container datepicker-container-right">
                <input
                  name="date"
                  type="date"
                  id="bookingDate"
                  placeholder="Choose your dates"
                  required="required"
                  className="form-control"
                  value={this.state.date}
                  onChange={event =>
                    this.setState({ date: event.target.value })
                  }
                />
              </div>
            </li>
            <li className="list-group-item">
              <label htmlFor="time" className="form-label">
                Start time:
              </label>
              <input
                type="time"
                name="time"
                className="form-control"
                value={this.state.time}
                onChange={event =>
                  this.setState({ time: event.target.value })
                }
              />
            </li>
            <li className="list-group-item">
              <label htmlFor="guests" className="form-label">
                Number of Guests:
              </label>
              <input
                type="number"
                name="guests"
                className="form-control"
                value={this.state.guests}
                onChange={event =>
                  this.setState({ guests: event.target.value })
                }
              />
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
              <select
                name='status'
                onChange={(event) => this.props.handleStatusChange(this.props.review.booking_id, event)}>
                <option selected value="1">Active</option>
                <option value="2">Finished</option>
                <option value="3">Canceled</option>
              </select>
            </li>
          </ul>
        </div>
      </div>
    );
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    return (
      <div className="card mb-3">
        <div className="row no-gutters">
          <div className="col-md-4">
            {/* <img src="..." class="card-img" alt="..."></img> */}
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">
                {this.props.booking.first_name} {this.props.booking.last_name}
              </h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <label htmlFor="bookingDate" className="form-label">
                    Booking date:
                  </label>
                  <div className="datepicker-container datepicker-container-right">
                    <input
                      name="date"
                      type="date"
                      id="bookingDate"
                      placeholder="Choose your dates"
                      required="required"
                      className="form-control"
                      value={moment(this.props.booking.date).format("YYYY-MM-DD")}
                      onChange={event =>
                        this.setState({ date: event.target.value })
                      }
                    />
                  </div>
                </li>
                <li className="list-group-item">
                  <label htmlFor="time" className="form-label">
                    Booking time:
              </label>
                  <input
                    type="time"
                    name="time"
                    className="form-control"
                    value={this.props.booking.start_time}
                    onChange={event =>
                      this.setState({ time: event.target.value })
                    }
                  />
                </li>
                <li className="list-group-item">
              <label htmlFor="guests" className="form-label">
                    Number of guests:
              </label>
                  <input
                    type="number"
                    name="guests"
                    className="form-control"
                    value={this.props.booking.no_of_people}
                    onChange={event =>
                      this.setState({ guests: event.target.value })
                    }
                  /> people
                </li>
                <select
                  onChange={event => this.props.handleStatusChange(this.props.booking, event)}
                >
                  <option selected value="1">Active</option>
                  <option value="2">Finished</option>
                  <option value="3">Canceled</option>
                </select>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MIndexContent;
