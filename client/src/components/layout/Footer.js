import React from "react";

const Footer = () => {
  return (
    <footer className="text-gray-300 bg-info py-3">
      <div className="container">
        <div className="row pt-md-4">
          <div className="col-md-6">
            <p className="text-white text-center text-md-left ">
              <i className="far fa-copyright" />
              2019 WDC Booking. All rights reserved
            </p>
          </div>
          <div className="col-md-6 text-md-right text-center">
            <ul className="list-inline justify-content-end mb-0">
              <li className="list-inline-item">
                <i className="fab fa-cc-visa fa-2x" />
              </li>
              <li className="list-inline-item">
                <i className="fab fa-cc-mastercard fa-2x" />
              </li>
              <li className="list-inline-item">
                <i className="fab fa-cc-paypal fa-2x" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
