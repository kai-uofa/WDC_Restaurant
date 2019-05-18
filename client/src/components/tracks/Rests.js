import React from "react";
import { Link } from "react-router-dom";

const Rests = props => {
  const { rest } = props;
  return (
    <div className="col-xl-4 col-lg-6 col-md-12 mb-5">
      <div className="card">
        <img src={rest.thumb} className="card-img-top h-50" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{rest.name}</h5>
          <p className="card-text">{rest.city}</p>
          <Link
            to={`/search/restaurants/${rest.id}`}
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
