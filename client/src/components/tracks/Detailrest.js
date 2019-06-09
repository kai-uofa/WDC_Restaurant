import React, { Component } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";

import MyMap from "./MyMap";
import Opentime from "./Opentime";
import Review from "./Review";
import Reservation from "./Reservation";
import Footer from "../layout/Footer";

class Detailrest extends Component {
  state = {
    detail: [],
    lat: null,
    lng: null
  };

  componentWillMount() {
    axios
      .get(`/restaurant?res_id=${this.props.match.params.id}`)
      .then(res => {
        this.setState({
          detail: res.data[0],
          lat: res.data[0].restaurant_latitude,
          lng: res.data[0].restaurant_longitude
        });
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
    const { detail, user } = this.state;
    return (
      <React.Fragment>
        <section className="pt-5 detailPage">
          <div className="container detailName">
            <div className="mt-5 mb-lg-0">
              <h2 className="text-shadow verified font-weight-bolder text-white display-3">
                {detail.restaurant_name}
              </h2>
              <p className="text-white display-5">
                <i className="fa-map-marker-alt fas mr-2 text-white " />
                {detail.restaurant_address}
              </p>
            </div>
          </div>
        </section>

        <div className="container bg-white">
          <div className="row">
            <div className="col-lg-8">
              {/* About */}
              <div className="text-block py-3">
                <h3 className="mb-3">About</h3>
                <p className="text-muted">{detail.restaurant_description}</p>
              </div>

              {/* Location */}
              <hr className="mb-4" />
              <div className="text-block py-3">
                <h3 className="mb-4">Location</h3>
                <MyMap
                  detail={detail}
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
                <Opentime detail={detail} />
              </div>
              {/* <!-- reviews --> */}
              <hr className="my-4" />
              <Review
                detail={detail}
                user={user}
                history={this.props.history}
              />
            </div>
            {/* Make a reservation form  */}
            <div className="col-lg-4">
              <Reservation
                detail={detail}
                user={user}
                history={this.props.history}
              />
            </div>
          </div>
        </div>
        {/* Footer section */}
        <Footer />
      </React.Fragment>
    );
  }
}

export default Detailrest;
