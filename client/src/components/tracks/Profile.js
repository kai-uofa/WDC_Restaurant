import React, { Component } from "react";

class Profile extends Component {
  state = {};
  render() {
    return (
      <div className="card mt-5 pt-5">
        <h5 className="card-header">Featured</h5>
        <div className="card-body">
          <h5 className="card-title">Special title treatment</h5>
          <p className="card-text">
            With supporting text below as a natural lead-in to additional
            content.
          </p>
        </div>
      </div>
    );
  }
}

export default Profile;
