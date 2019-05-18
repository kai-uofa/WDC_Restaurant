import React from "react";
const SignIn = () => {
  return (
    <div className="container-fluid px-3">
      <div className="row min-vh-100">
        <div className="col-md-8 col-lg-6 col-xl-5 d-flex align-items-center">
          <div className="w-100 py-5 px-md-5 px-xl-6 position-relative">
            <div className="mb-6 pb-5">
              <h2>Welcome Back</h2>
            </div>
            <form className="form-validate">
              <div className="form-group">
                <label for="loginUsername" className="form-label">
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
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label for="loginPassword" className="form-label">
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
                  className="form-control"
                />
              </div>
              <button
                type="submit"
                className="btn btn-lg btn-block btn-primary"
              >
                SIGN IN
              </button>
              <hr />

              <button className="btn btn-outline-secondary mb-3 btn-block text-center ">
                <span className="d-sm-inline text-dark py-sm-2">
                  Connect with Google
                </span>
              </button>
            </form>
          </div>
        </div>
        <div className="col-md-4 col-lg-6 col-xl-7 d-none d-md-block">
          <div className="background-signin bg-cover h-100 mr-n3" />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
