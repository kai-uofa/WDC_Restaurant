import React, { Component } from "react";

class Review extends Component {
  state = {
    email: "",
    firstName: ""
  };
  handleOnClick = e => {
    if (this.props.user === undefined) {
      this.props.history.push({
        pathname: "/signin",
        state: { from: this.props.history.location }
      });
    }
    try {
      this.setState({
        email: this.props.user.email,
        firstName: this.props.user.firstName
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
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
              We had an engagement party here and the staff and service was
              amazing. They were so profesional and kept everybody happy. I'm so
              grateful. We will be returning some day!
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
            onClick={this.handleOnClick}
          >
            Leave a review
          </button>
          <div id="leaveReview" className="collapse mt-4">
            <h5 className="mb-4">Leave a review</h5>
            <form id="contact-form" method="get" action="#" className="form">
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
                      value={this.state.firstName}
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
                  value={this.state.email}
                  id="email"
                  placeholder="email"
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
    );
  }
}

export default Review;
