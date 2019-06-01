import React from "react";

const Footer = () => {
  return (
    <footer class="text-gray-300 bg-info py-3">
      <div class="container">
        <div class="row pt-md-4">
          <div class="col-md-6">
            <p class="text-white text-center text-md-left ">
              <i class="far fa-copyright" />
              2019 WDC Booking. All rights reserved
            </p>
          </div>
          <div class="col-md-6 text-md-right text-center">
            <ul class="list-inline justify-content-end mb-0">
              <li class="list-inline-item">
                <i class="fab fa-cc-visa fa-2x" />
              </li>
              <li class="list-inline-item">
                <i class="fab fa-cc-mastercard fa-2x" />
              </li>
              <li class="list-inline-item">
                <i class="fab fa-cc-paypal fa-2x" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
