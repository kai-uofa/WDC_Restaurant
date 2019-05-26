import React from "react";
import { Link } from "react-router-dom";

const Member = () => {
  return (
    <section className="member">
      <div className="content container">
        <div className="overlay-content text-white">
          <h3 className="display-4 font-weight-bold text-shadow mb-5 mt-5">
            Have a restaurant?
            <br />
            Join our WDC family!
          </h3>
          <Link className="btn btn-outline-light btn-lg" to="/manager/signup">
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Member;
