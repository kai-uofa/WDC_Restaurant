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
  render() {
    return (
      <div className="container">
        <div class="row userCard">
          {this.state.reviews
            .slice(0)
            .reverse()
            .map(review => (
              <Profilecontent key={review.date} review={review} />
            ))}
        </div>
      </div>
    );
  }
}

export default Profile;
