import React, { Component } from "react";
import jwtDecode from "jwt-decode";
import Profilecontent from "./Profilecontent";
import axios from "axios";

class Profile extends Component {
  state = {
    reviews: []
  };

  componentDidMount() {
    const jwt = localStorage.getItem("token");
    const user = jwtDecode(jwt);
    axios
      .post("users/profile", {
        email: user.email
      })
      .then(res => {
        this.setState({ reviews: res.data });
        console.log(this.state.reviews);
      })
      .catch(console.error);
  }
  render() {
    const { reviews } = this.state;
    return (
      <div className="card mt-5 pt-5">
        <h5 className="card-header"> Hello Name</h5>
        {reviews.map(review => (
          <Profilecontent key={review.date} />
        ))}
        {/* <Profilecontent /> */}
      </div>
    );
  }
}

export default Profile;
