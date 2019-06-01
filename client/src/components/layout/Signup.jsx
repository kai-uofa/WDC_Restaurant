import React, { Component } from "react";
import GoogleLogin from "react-google-login";
import { Redirect } from "react-router-dom";
import axios from "axios";
import config from "../../config.json";
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email : "",
      password : "",
      password2: "",
      errors: {}, // collect errors for validateForm
      isSignIn: this.props.isSignIn
    };
  }

  handleChange = (e) => {
    if(e.target.name == 'firstName') {
      this.setState({firstName: e.target.value});
    }
    if (e.target.name == 'lastName'){
      this.setState({lastName:e.target.value});
    }
    if(e.target.name == 'email') {
      this.setState({email: e.target.value});
    }
    if (e.target.name == 'password'){
      this.setState({password:e.target.value});
    }
    if(e.target.name == 'password2') {
      this.setState({password2: e.target.value});
    }
  };

  validateForm() {
    let firstName = this.state.firstName;
    let lastName = this.state.lastName;
    let email = this.state.email;
    let password = this.state.password;
    let password2 = this.state.password2;
    let errors = {};
    let formIsValid = true;


      if (!firstName.match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["firstName"] = "*Please enter alphabet characters only.";
      }

   
    if (firstName.length < 2) {
      formIsValid = false;
      errors["firstName"] = "Please enter at least 2 character.";
    }
   
      if (!lastName.match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["lastName"] = "*Please enter alphabet characters only.";
      }
      if (lastName.length < 2) {
        formIsValid = false;
        errors["lastName"] = "Please enter at least 2 character.";
      }
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(email)) {
        formIsValid = false;
        errors["email"] = "*Please enter valid email-ID.";
      }

    if (password !== password2) {
      formIsValid = false;
      errors["password"] = "*The password is not matching";
    }
    if (password.length < 8) {
      formIsValid = false;
      errors["password"] = "*Password need to at least has 8 character";
    }
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
        .post("https://localhost:5443/signup", {
          // fields: this.state.fields
          firstName : this.state.firstName,
          lastName : this.state.lastName,
          email : this.state.email,
          password : this.state.password,
          password2 : this.state.password2
        })
        .then(res => {
          // TODO: handle server response codes 200, 409, 401
          if (res.status === 200) {
            this.props.history.push("/");
          }
          console.log(res);
        })
        .catch(console.error);

      // Reset all text fields   
      this.setState({ firstName: "",lastName:"",email:"",password:"",password2:"" });
    }
  };

  onFailure = error => {
    alert(error);
  };

  googleResponse = response => {
    axios
      .post("https://localhost:5443/signup", {
        firstName: response.profileObj.givenName,
        lastName: response.profileObj.familyName,
        email: response.profileObj.email,
        token: response.tokenId
      })
      .then(res => {
        // TODO: handle server response codes 200, 409, 401
        // TODO: handle json from server
        if (res.status === 200) {
          this.props.history.push("/");
          this.setState({ isSignIn: true });
          console.log(this.state.isSignIn);
        }
      })
      .catch(console.error);
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
