import React from "react";

const Feature = () => {
  return (
    <section className="feature bg-light pt-5">
      <div className="container">
        <div className="text-center pb-5 ">
          <h2>Booking with us is easy</h2>
        </div>
        <div className="row">
          <div className="col-xl-4 mb-4">
            <div className="px-3 text-center">
              <div className="svg pb-3">
                <i className="far fa-map display-4" />
              </div>
              <h3>Find the perfect restaurant</h3>
              <p className="text-muted">
                Over 17,000 restaurants in 12 countries. Find and reserve the
                very best of them in your neighbourhood, your city and beyond.
              </p>
            </div>
          </div>
          <div className="col-xl-4 mb-4">
            <div className="px-3 text-center">
              <div className="svg pb-3">
                <i className="far fa-handshake display-4" />
              </div>
              <h3>Book with confidence</h3>
              <p className="text-muted">
                The Book with Confidence Guarantee is to help travelers feel
                confident booking on our site, reducing booking hesitation that
                in turn supports our homeowners
              </p>
            </div>
          </div>
          <div className="col-xl-4 mb-4">
            <div className="px-3 text-center">
              <div className="svg pb-3">
                <i className="far fa-heart display-4 " />
              </div>
              <h3>Enjoy your vacation</h3>
              <p className="text-muted">
                Start your day in the cosy atmosphere of the conservatory with a
                rich breakfast buffet consisting of selected products from our
                region.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature;
