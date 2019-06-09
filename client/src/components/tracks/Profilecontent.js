import React from "react";
import moment from "moment";
const Profilecontent = props => {
  return (
    <div className=" col-xl-3 col-lg-6 col-md-12 mb-5 ">
      <div className="card profile">
        <img
          src={props.review.restaurant_image}
          className="card-img-top imageProfile"
          alt={props.review.restaurant_name}
        />

        <div className="card-body">
          <h5 className="card-title">Hello {props.review.first_name}</h5>
          <p className="card-text">
            Your booing details with <br />
            <strong>{props.review.restaurant_name}</strong>
          </p>
        </div>

        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            Date: {moment(props.review.date).format("MM/DD/YYYY")}
          </li>
          <li className="list-group-item">Start: {props.review.start_time}</li>
          <li className="list-group-item">
            Number of people: {props.review.no_of_people} people
          </li>
          <li className="list-group-item">
            <button
              className="btn btn-outline-danger btnDelete"
              onClick={() => props.handleOnDelete(props.review)}
            >
              Delete
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Profilecontent;
