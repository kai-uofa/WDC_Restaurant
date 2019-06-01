import React, { Component } from "react";
import GoogleLogin from "react-google-login";
import axios from "axios";
import config from "../../config.json";
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {},
      errors: {}
    };
  }

  handleChange = e => {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields
    });
  };
  validateForm() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields["firstName"]) {
      formIsValid = false;
      errors["firstName"] = "*Please enter your First Name.";
    }

    if (typeof fields["firstName"] !== "undefined") {
      if (!fields["firstName"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["firstName"] = "*Please enter alphabet characters only.";
      }
    }
    if (fields["firstName"].length < 3) {
      formIsValid = false;
      errors["firstName"] = "Please enter at least 3 character.";
    }
    if (!fields["lastName"]) {
      formIsValid = false;
      errors["lastName"] = "*Please enter your Last Name.";
    }

    if (typeof fields["lastName"] !== "undefined") {
      if (!fields["lastName"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["lastName"] = "*Please enter alphabet characters only.";
      }
      if (fields["lastName"].length < 3) {
        formIsValid = false;
        errors["lastName"] = "Please enter at least 3 character.";
      }
    }
    if (!fields["email"]) {
      formIsValid = false;
      errors["email"] = "*Please enter your email-ID.";
    }

    if (typeof fields["email"] !== "undefined") {
      //regular expression for email validation
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(fields["email"])) {
        formIsValid = false;
        errors["email"] = "*Please enter valid email-ID.";
      }
    }

    if (!fields["password"]) {
      formIsValid = false;
      errors["password"] = "*Please enter your password.";
    }

    if (fields["password"] !== fields["password2"]) {
      formIsValid = false;
      errors["password"] = "*The password is not matching";
    }
    if (fields["password"].length < 5) {
      formIsValid = false;
      errors["password"] = "*Password need to at least has 8 character";
    }

    // if (typeof fields["password"] !== "undefined") {
    //   if (!fields["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
    //     formIsValid = false;
    //     errors["password"] = "*Please enter secure and strong password.";
    //   }
    // }

    this.setState({
      errors: errors
    });
    return formIsValid;
  }

  normalSignUp = e => {
    e.preventDefault();
    if (this.validateForm()) {
      // Send request to server
      axios
        .post("/signup", {
          // fields: this.state.fields
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          password: this.state.password,
          password2: this.state.password2
        })
        .then(res => {
          localStorage.setItem("token", res.data);
          window.location = "/";
        })
        .catch(console.error);

      // Reset all text fields
      this.setState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        password2: ""
      });
    }
  };

  googleResponse = response => {
    axios
      .post("/signup", {
        firstName: response.profileObj.givenName,
        lastName: response.profileObj.familyName,
        email: response.profileObj.email,
        token: response.tokenId
      })
      .then(res => {
        localStorage.setItem("token", res.data);
        window.location = "/";
      })
      .catch(console.error);
  };

  onFailure = error => {
    alert(error);
  };

  render() {
    return (
      <div className="container-fluid px-3">
        <div className="row min-vh-100">
          <div className="col-md-8 col-lg-6 col-xl-5 d-flex align-items-center">
            <div className="w-100 py-5 px-md-5 px-xl-6 position-relative">
              <div className="mb-4">
                <h2>Sign up</h2>
              </div>
              <form
                className="form-validate"
                method="post"
                onSubmit={this.normalSignUp}
              >
                <div className="form-group">
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <input
                    name="firstName"
                    id="firstName"
                    type="text"
                    placeholder="First Name"
                    value={this.state.firstName}
                    onChange={this.handleChange}
                    autoComplete="off"
                    required
                    data-msg="Please enter your first name"
                    className="form-control"
                  />
                </div>
                <div className="errorMsg">{this.state.errors.firstName}</div>

                <div className="form-group">
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    name="lastName"
                    id="lastName"
                    type="text"
                    placeholder="Last Name"
                    value={this.state.lastName}
                    onChange={this.handleChange}
                    autoComplete="off"
                    required
                    data-msg="Please enter your last name"
                    className="form-control"
                  />
                </div>
                <div className="errorMsg">{this.state.errors.lastName}</div>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    name="email"
                    id="email"
                    type="email"
                    placeholder="name@address.com"
                    value={this.state.email}
                    onChange={this.handleChange}
                    autoComplete="off"
                    required
                    data-msg="Please enter your email"
                    className="form-control"
                  />
                </div>
                <div className="errorMsg">{this.state.errors.email}</div>
                <div className="form-group">
                  <label htmlFor="password" className="form-label">
                    {" "}
                    Password
                  </label>
                  <input
                    name="password"
                    id="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    type="password"
                    required
                    data-msg="Please enter your password"
                    className="form-control"
                  />
                  <div className="errorMsg">{this.state.errors.password}</div>
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="password2" className="form-label">
                    Confirm your password
                  </label>
                  <input
                    name="password2"
                    id="password2"
                    placeholder="Password"
                    type="password"
                    required
                    value={this.state.password2}
                    onChange={this.handleChange}
                    data-msg="Please enter your password"
                    className="form-control"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-lg btn-block btn-primary"
                >
                  SIGN UP
                </button>
                <hr />
              </form>
              <GoogleLogin
                className="btn btn-lg btn-block btn-primary center"
                clientId={config.GOOGLE_CLIENT_ID}
                buttonText="Sign up with Google"
                onSuccess={this.googleResponse}
                onFailure={this.onFailure}
                cookiePolicy={"single_host_origin"}
              />
            </div>
          </div>
          <div className="col-md-4 col-lg-6 col-xl-7 d-none d-md-block">
            <div className="background-signin bg-cover h-100 mr-n3" />
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
