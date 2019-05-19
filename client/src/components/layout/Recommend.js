import React from "react";
import right1 from "../../images/top-right-1.jpg";
import right2 from "../../images/top-right-2.jpg";
import right3 from "../../images/top-right-3.jpg";

const Recommend = () => {
  return (
    <section className="recommend pt-6 bg-white">
      <div className="container">
        <div className="row mb-5">
          <div className="col-md-8">
            <p className="subtitle letter-spacing-4 mb-2 text-shadow">
              EAT LIKE A LOCAL
            </p>
            <h2>Popular Restarants</h2>
          </div>
          <div className="col-md-4 d-flex justify-content-end">
            <a href="..." className="text-muted text-sm">
              See all guides
              <i className="fas fa-angle-double-right ml-2" />
            </a>
          </div>
        </div>
        <div className="row">
          <div className=" col-xl-3 col-lg-6 col-md-12 mb-5 ">
            <div className="card">
              <img src={right1} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Martini Ristorante</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <a href="..." className="btn btn-primary">
                  Booking
                </a>
              </div>
            </div>
          </div>
          <div className=" col-xl-3 col-lg-6 col-md-12 mb-5 ">
            <div className="card">
              <img src={right3} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Gaucho's</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <a href="..." className="btn btn-primary">
                  Booking
                </a>
              </div>
            </div>
          </div>
          <div className=" col-xl-3 col-lg-6 col-md-12 mb-5 ">
            <div className="card">
              <img src={right2} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Godi La Vita</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <a href="..." className="btn btn-primary">
                  Booking
                </a>
              </div>
            </div>
          </div>
          <div className=" col-xl-3 col-lg-6 col-md-12 mb-5 ">
            <div className="card">
              <img src={right3} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Gaucho's</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <a href="..." className="btn btn-primary">
                  Booking
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Recommend;
