import React from "react";
import { Link } from "react-router-dom";

const Rests = props => {
  const { rest } = props;
  return (
    <div className="col-xl-3 col-lg-6 col-md-12 mb-5">
      <div className="card h-100">
        <img
          src={rest.restaurant_image}
          className="card-img-top overflow-hidden dark-overlay bg-cover"
          alt="."
        />
        <div className="card-body">
          <h5 className="card-title my-3">{rest.restaurant_name}</h5>
          <p className="card-text">{rest.restaurant_address}</p>
          <Link
            to={`/search/restaurants/${rest.restaurant_id}`}
            className="btn btn-primary"
          >
            Booking
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Rests;
