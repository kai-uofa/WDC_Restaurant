import React, { Component } from "react";
import axios from "axios";
import Reviewcontent from "./Reviewcontent";

class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      firstName: "",
      rating: 5,
      review: "",
      list_reviews: []
    };
  }

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

  handleSubmit = async e => {
    e.preventDefault();
    //send info reviews to database
    await axios
      .post("/users/review", {
        firstName: this.state.firstName,
        email: this.props.user.email,
        rating: this.state.rating,
        review: this.state.review,
        restaurant_id: this.props.detail.restaurant_id
      })
      .then(res => {
        console.log(res);
      })
      .catch(console.error);
    //get all reviews from database
    this.gettingReview();
  };

  gettingReview() {
    axios
      .post("/restaurant/reviews", {
        restaurant_id: this.props.detail.restaurant_id
      })
      .then(res => {
        this.setState({ list_reviews: res.data });
        console.log(this.state.list_reviews);
      })
      .catch(console.error);
  }

  render() {
    const { list_reviews } = this.state;
    return (
      <div className="text-block pt-3">
        <h5 className="subtitle text-sm">Reviews</h5>
        {list_reviews
          .slice(0)
          .reverse()
          .map(review => (
            <Reviewcontent key={list_reviews.review_id} review={review} />
          ))}

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
            <form
              id="contact-form"
              method="post"
              onSubmit={this.handleSubmit}
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
                      onChange={event =>
                        this.setState({ rating: event.target.value })
                      }
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
                  onChange={event =>
                    this.setState({ review: event.target.value })
                  }
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
