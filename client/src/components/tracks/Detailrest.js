import React, { Component } from "react";
import axios from "axios";
import MyMap from "./MyMap";

class Detailrest extends Component {
  state = {
    detail: [],
    lat: null,
    lng: null
  };

  componentWillMount() {
    axios
      .get(
        `https://localhost:5443/restaurant?res_id=${this.props.match.params.id}`
      )
      .then(res => {
        this.setState({
          detail: res.data[0],
          lat: res.data[0].restaurant_latitude,
          lng: res.data[0].restaurant_longitude
        });
      })
      .catch(err => console.log(err));
  }
  render() {
    const { detail } = this.state;
    return (
      <React.Fragment>
        <div className="container">
          <section className="pt-5">
            <div className="mt-5 mb-lg-0">
              <h2 className="text-shadow verified">{detail.restaurant_name}</h2>
              <p>
                <i className="fa-map-marker-alt fas mr-2" />
                {detail.restaurant_address}
              </p>
            </div>
          </section>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              {/* About */}
              <div className="text-block py-3">
                <h3 className="mb-3">About</h3>
                <p className="text-muted">{detail.restaurant_description}</p>
              </div>

              {/* Location */}
              <hr className="my-4" />
              <div className="text-block py-3">
                <h3 className="mb-4">Location</h3>
                <MyMap
                  lng={this.state.lng}
                  lat={this.state.lat}
                  isMarkerShown
                  googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAhIWHIyj2pudRfrZ3ST_0oP2bq1C8KLV0`}
                  loadingElement={<div style={{ height: `100%` }} />}
                  containerElement={<div style={{ height: `400px` }} />}
                  mapElement={<div style={{ height: `100%` }} />}
                />
              </div>

              {/* Opening time, address and phone number */}
              <div className="text-block py-3">
                <div className="row">
                  <div className="col-md-6 border-right pr-4">
                    <table className="table text-sm mb-0 ">
                      <tbody>
                        <tr>
                          <th className="pl-0 border-0">Sunday</th>
                          <td className="pr-0 text-right border-0">
                            8:00 am - 6:00 pm
                          </td>
                        </tr>
                        <tr>
                          <th className="pl-0">Monday</th>
                          <td className="pr-0 text-right">8:00 am - 6:00 pm</td>
                        </tr>
                        <tr>
                          <th className="pl-0">Tuesday</th>
                          <td className="pr-0 text-right">8:00 am - 6:00 pm</td>
                        </tr>
                        <tr>
                          <th className="pl-0">Wednesday</th>
                          <td className="pr-0 text-right">8:00 am - 6:00 pm</td>
                        </tr>
                        <tr>
                          <th className="pl-0">Thursday</th>
                          <td className="pr-0 text-right">8:00 am - 6:00 pm</td>
                        </tr>
                        <tr>
                          <th className="pl-0">Friday</th>
                          <td className="pr-0 text-right">8:00 am - 6:00 pm</td>
                        </tr>
                        <tr>
                          <th className="pl-0">Saturday</th>
                          <td className="pr-0 text-right">Closed</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="col-md-6 mt-4">
                    <ul className="list-unstyled text-muted ml-3 ">
                      <li className="mb-2 d-flex">
                        <i className="fas fa-map-marker-alt fa-2x mr-4" />
                        <span className="text-sm">Address</span>
                      </li>
                      <p className="mb-4">{detail.restaurant_address}</p>
                      <li className="d-flex">
                        <i className="fas fa-phone-square fa-2x mr-3" />
                        <span>+61870731231</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* <!-- reviews --> */}
              <hr className="my-4" />
              <div className="text-block pt-3">
                <h5 className="subtitle text-sm">Reviews</h5>
                <div className="media d-block d-sm-flex review">
                  <div className="media-body">
                    <h6 className="mt-2 mb-1">Princess Leia</h6>
                    <div className="mb-2">
                      <i className="fa fa-xs fa-star text-primary" />
                      <i className="fa fa-xs fa-star text-primary" />
                      <i className="fa fa-xs fa-star text-primary" />
                      <i className="fa fa-xs fa-star text-gray-200" />
                      <i className="fa fa-xs fa-star text-gray-200" />
                    </div>
                    <p className="text-muted text-sm">
                      We had an engagement party here and the staff and service
                      was amazing. They were so profesional and kept everybody
                      happy. I'm so grateful. We will be returning some day!
                    </p>
                  </div>
                </div>
                <div className="py-5">
                  <button
                    type="button"
                    data-toggle="collapse"
                    data-target="#leaveReview"
                    aria-expanded="false"
                    aria-controls="leaveReview"
                    className="btn btn-outline-primary"
                  >
                    Leave a review
                  </button>
                  <div id="leaveReview" className="collapse mt-4">
                    <h5 className="mb-4">Leave a review</h5>
                    <form
                      id="contact-form"
                      method="get"
                      action="#"
                      className="form"
                    >
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label htmlFor="name" className="form-label">
                              Your name *
                            </label>
                            <input
                              type="text"
                              name="name"
                              id="name"
                              placeholder="Enter your name"
                              required="required"
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label htmlFor="rating" className="form-label">
                              Your rating *
                            </label>
                            <select
                              name="rating"
                              id="rating"
                              className="custom-select focus-shadow-0"
                            >
                              <option value="5">★★★★★ (5/5)</option>
                              <option value="4">★★★★☆ (4/5)</option>
                              <option value="3">★★★☆☆ (3/5)</option>
                              <option value="2">★★☆☆☆ (2/5)</option>
                              <option value="1">★☆☆☆☆ (1/5)</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="email" className="form-label">
                          Your email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          placeholder="Enter your  email"
                          required="required"
                          className="form-control"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="review" className="form-label">
                          Review text *
                        </label>
                        <textarea
                          rows="4"
                          name="review"
                          id="review"
                          placeholder="Enter your review"
                          required="required"
                          className="form-control"
                        />
                      </div>
                      <button type="submit" className="btn btn-primary">
                        Post review
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            {/* Make a reservation form  */}
            <div className="col-lg-4">
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
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Detailrest;
