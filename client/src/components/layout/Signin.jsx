import React, { Component } from "react";
import GoogleLogin from "react-google-login";
import axios from "axios";
import config from "../../config.json";
class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {}, // collect errors for validateForm
      loginError: ""
    };
  }

  handleChange = e => {
    if (e.target.name === "email") {
      this.setState({ email: e.target.value });
    }
    if (e.target.name === "password") {
      this.setState({ password: e.target.value });
    }
  };

  validateForm() {
    let email = this.state.email;
    let errors = {};
    let formIsValid = true;

    if (email === "") {
      formIsValid = false;
      errors["email"] = "*Please enter your email-ID.";
    }

    //regular expression for email validation
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    if (!pattern.test(email)) {
      formIsValid = false;
      errors["email"] = "*Please enter valid email-ID.";
    }

    this.setState({
      errors: errors
    });
    return formIsValid;
  }

  normalSignIn = e => {
    e.preventDefault();
    if (this.validateForm()) {
      // Send request to server
      axios
        .post("/signin", {
          email: this.state.email,
          password: this.state.password
        })
        .then(res => {
          localStorage.setItem("token", res.data);
          const { state } = this.props.location;
          window.location = state ? state.from.pathname : "/";
        })
        .catch(console.error);

      // Reset all text fields
      this.setState({ email: "", password: " " });
    }
  };

  googleResponse = response => {
    axios
      .post("/signin", {
        firstName: response.profileObj.givenName,
        lastName: response.profileObj.familyName,
        email: response.profileObj.email,
        token: response.tokenId
      })
      .then(res => {
        console.log(res);
        localStorage.setItem("token", res.data);
        const { state } = this.props.location;
        window.location = state ? state.from.pathname : "/";
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
              <div className="mb-6 pb-5">
                <h2>Welcome Back</h2>
              </div>
              <div className="bg-gradient-warning">{this.state.loginError}</div>
              <form
                className="form-validate"
                method="post"
                onSubmit={this.normalSignIn}
              >
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
                    required
                    data-msg="Please enter your email"
                    className="form-control"
                  />
                </div>
                <div className="errorMsg">{this.state.errors.email}</div>
                <div className="form-group">
                  <label htmlFor="password" className="form-label">
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
                </div>
                <div className="errorMsg">{this.state.errors.password}</div>
                <button
                  type="submit"
                  className="btn btn-lg btn-block btn-primary"
                >
                  SIGN IN
                </button>
                <hr />
              </form>
              <GoogleLogin
                className="btn btn-lg btn-block btn-primary"
                clientId={config.GOOGLE_CLIENT_ID}
                buttonText="Sign in with Google"
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

export default SignIn;
