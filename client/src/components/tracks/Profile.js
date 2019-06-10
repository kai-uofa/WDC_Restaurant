import React, { Component } from "react";
import Profilecontent from "./Profilecontent";
import axios from "axios";

class Profile extends Component {
  state = {
    reviews: []
  };

  componentDidMount() {
    axios
      .get("users/profile")
      .then(res => {
        this.setState({ reviews: res.data });
      })
      .catch(console.error);
  }

  handleOnDelete = review => {
    axios
      .post("/users/deletebooking", {
        booking_id: review.booking_id,
        status: 2
      })
      .then(res => {
        this.setState({ reviews: res.data });
      })
      .catch(console.error);
  };
  render() {
    return (
      <div className="container">
        <div className="row userCard">
          {this.state.reviews
            .slice(0)
            .reverse()
            .map(review => (
              <Profilecontent
                key={review.booking_id}
                review={review}
                handleOnDelete={this.handleOnDelete}
              />
            ))}
        </div>
      </div>
    );
  }
}

export default Profile;
