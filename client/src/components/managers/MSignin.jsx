import React, { Component } from "react";
import axios from "axios";

class MSignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {},
      errors: {}, // collect errors for validateForm
      loginError: ""
    };
  }

  handleChange = e => {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({ fields });
  };

  validateForm() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

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
        .post("https://localhost:5443/managers/signin", {
          fields: this.state.fields
        })
        .then(res => {
          // TODO: handle server response codes 200, 401
          console.log(res);
        })
        .catch(console.error);

      // Reset all text fields
      let fields = {
        email: "",
        password: ""
      };
      this.setState({ fields: fields });
    }
  };

  render() {
    return (
      <div className="container-fluid px-3">
        <div className="row min-vh-100">
          <div className="col-md-8 col-lg-6 col-xl-5 d-flex align-items-center">
            <div className="w-100 py-5 px-md-5 px-xl-6 position-relative">
              <div className="mb-6 pb-5">
                <h2>WDC Restaurant Manager</h2>
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
              </form>
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

export default MSignIn;
