// import React from "react";
import React, { Component } from "react";
// const SignUp = () => {
  const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );
  class SignUp extends Component {
    
    
  render() {
  return (
    <div className="container-fluid px-3">
      <div className="row min-vh-100">
        <div className="col-md-8 col-lg-6 col-xl-5 d-flex align-items-center">
          <div className="w-100 py-5 px-md-5 px-xl-6 position-relative">
            <div className="mb-4">
              <h2>Sign up</h2>
            </div>
            <form className="form-validate" onSubmit={this.handleSubmit}>
              <div className ="form-group">
                <label htmlFor="firstName" class="form-label">
                  First Name
                </label>
                <input
                  name="firstName"
                  id="firstName"
                  type="text"
                  placeholder="First Name"
                  onChange={this.handleChange}
                  autoComplete="off"
                  required
                  data-msg="Please enter your first name"
                  class="form-control"
                  /> 
              </div>
  
              <div class ="form-group">
                <label for="lastName" class="form-label">
                  First Name
                </label>
                <input
                  name="lastName"
                  id="lastName"
                  type="text"
                  placeholder="Last Name"
                  onChange={this.handleChange}
                  autoComplete="off"
                  required
                  data-msg="Please enter your last name"
                  class="form-control"
                  /> 
              </div>
              <div class="form-group">
                <label for="email" class="form-label">
                  Email Address
                </label>
                <input
                  name="email"
                  id="email"
                  type="email"
                  placeholder="name@address.com"
                  onChange={this.handleChange}
                  autoComplete="off"
                  required
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
                  onChange={this.handleChange}
                  type="password"
                  required
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
                  onChange={this.handleChange}
                  type="password"
                  required
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
}

export default SignUp;
