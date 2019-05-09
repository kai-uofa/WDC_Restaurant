import React from "react";
import logo from "../images/logo.jpeg";

const SignUp = () => {
  return (
    <div class="container-fluid px-3">
      <div class="row min-vh-100">
        <div class="col-md-8 col-lg-6 col-xl-5 d-flex align-items-center">
          <div class="w-100 py-5 px-md-5 px-xl-6 position-relative">
            <div class="mb-4">
              <h2>Sign up</h2>
            </div>
            <form class="form-validate">
              <div class="form-group">
                <label for="loginUsername" class="form-label">
                  Email Address
                </label>
                <input
                  name="loginUsername"
                  id="loginUsername"
                  type="email"
                  placeholder="name@address.com"
                  autocomplete="off"
                  required=""
                  data-msg="Please enter your email"
                  class="form-control"
                />
              </div>
              <div class="form-group">
                <label for="loginPassword" class="form-label">
                  {" "}
                  Password
                </label>
                <input
                  name="loginPassword"
                  id="loginPassword"
                  placeholder="Password"
                  type="password"
                  required=""
                  data-msg="Please enter your password"
                  class="form-control"
                />
              </div>
              <div class="form-group mb-4">
                <label for="loginPassword2" class="form-label">
                  Confirm your password
                </label>
                <input
                  name="loginPassword2"
                  id="loginPassword2"
                  placeholder="Password"
                  type="password"
                  required=""
                  data-msg="Please enter your password"
                  class="form-control"
                />
              </div>
              <button type="submit" class="btn btn-lg btn-block btn-primary">
                Sign up
              </button>
              <hr />
              <button class="btn btn-outline-secondary mb-3 btn-block text-center ">
                <span class="d-sm-inline text-dark">Connect with Google</span>
              </button>
            </form>
          </div>
        </div>
        <div class="col-md-4 col-lg-6 col-xl-7 d-none d-md-block">
          <div class="background-signin bg-cover h-100 mr-n3" />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
