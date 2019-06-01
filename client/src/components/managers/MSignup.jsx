import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {},
      errors: {}, // collect errors for validateForm
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
    // Restaurant Name validation
    if (!fields["resName"]) {
      formIsValid = false;
      errors["resName"] = "*Please enter your Restaurant Name.";
    }
    if (fields["resName"].length < 3) {
      formIsValid = false;
      errors["resName"] = "Please enter at least 3 character.";
    }
    // Restaurant adress validation
    if (!fields["resAdress"]) {
      formIsValid = false;
      errors["resAdress"] = "*Please enter your Restaurant Location.";
    }

    if (typeof fields["resAdress"] !== "undefined") {
      if (fields["resAdress"].length < 3) {
        formIsValid = false;
        errors["resAdress"] = "Please enter at least 3 character.";
      }
    }
    // Manger firstName 
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
    // Manger Last Name
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
    // Manager Email
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
    //Manager password
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
    this.setState({
      errors: errors
    });
    return formIsValid;
  };

  normalSignUp = e => {
    e.preventDefault();
    if (this.validateForm()) {
      // Send request to server
      axios
        .post("/managers/signup", {
          fields: this.state.fields
        })
        .then(res => {
          // TODO: handle server response codes 200, 409, 401
          console.log(res);
        })
        .catch(console.error);
      
      // Reset all text fields
      let fields = {
        resName: '',
        resAdress: '',
        capacity: '',
        description: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        password2: ''
      };
      this.setState({ fields: fields });
    }
  };

  render() {
    // TODO: handle server response codes 200, 409, 401
    // TODO: handle user session login (req.session.email)
    if (this.state.redirect || sessionStorage.getItem("userData")) {
      return <Redirect to={"/"} />;
    }

    return (
      <div className="container-fluid px-3">
        <div className="row min-vh-100">
          <div className="col-md-8 col-lg-6 col-xl-5 d-flex align-items-center">
            <div className="w-100 py-5 px-md-5 px-xl-6 position-relative">
              <div className="mb-4">
                <h2>Get started with Us</h2>
                <p>Tell us a little about you and your restaurant, and we’ll contact you via phone or email to provide information about WDC products and services.</p>
              </div>
              <form className="form-validate"
                method="post" 
                onSubmit={this.normalSignUp}
              >
                {/* Restaurant Name */}
                <div className="form-group">
                  <label htmlFor="resName" class="form-label">
                    Restaurant Name
                  </label>
                  <input
                    name="resName"
                    id="resName"
                    type="text"
                    placeholder="Restaurant Name"
                    value={this.state.fields.resName}
                    onChange={this.handleChange}
                    autoComplete="off"
                    required
                    data-msg="Please enter your Restaurant Name"
                    class="form-control"
                  />
                </div>
                <div className="errorMsg">{this.state.errors.resName}</div>
                   {/* Restaurant Adress */}
                <div class="form-group">
                  <label for="resAdress" class="form-label">
                    Restaurant Location
                  </label>
                  <input
                    name="resAdress"
                    id="resAdress"
                    type="text"
                    placeholder="Restaurant Location"
                    value={this.state.fields.resAdress}
                    onChange={this.handleChange}
                    autoComplete="off"
                    required
                    data-msg="Please enter your Restaurant Location"
                    class="form-control"
                  />
                </div>
                <div className="errorMsg">{this.state.errors.resAdress}</div>
                  {/* Restaurant Capacity */}
                <div class="form-group">
                  <label for="capacity" class="form-label">
                    Capacity
                  </label>
                  <input
                    name="capacity"
                    id="capacity"
                    type="number"
                    min="0"
                    placeholder="How many customer can you Restaurant hold"
                    value={this.state.fields.capacity}
                    onChange={this.handleChange}
                    autoComplete="off"
                    required
                    data-msg="How many customer can you Restaurant hold"
                    class="form-control"
                  />
                </div>
                <div className="errorMsg">{this.state.errors.capacity}</div>
                 {/* Restaurant Description */}
                <div class="form-group">
                  <label for="password" class="form-label">
                     Restaurant Description (Optional)
                  </label>
                  <input
                    name="description"
                    id="description"
                    placeholder="Tell us about your Restaurant"
                    value={this.state.fields.description}
                    onChange={this.handleChange}
                    type="text"
                    data-msg="Please  enter your description"
                    class="form-control"
                  />
                </div>
                 {/* Manager First Name */}
                <div className="form-group">
                  <label htmlFor="firstName" class="form-label">
                    First Name
                  </label>
                  <input
                    name="firstName"
                    id="firstName"
                    type="text"
                    placeholder="First Name"
                    value={this.state.fields.firstName}
                    onChange={this.handleChange}
                    autoComplete="off"
                    required
                    data-msg="Please enter your first name"
                    class="form-control"
                  />
                </div>
                <div className="errorMsg">{this.state.errors.firstName}</div>
                    {/* Manager Last Name */}
                <div class="form-group">
                  <label for="lastName" class="form-label">
                    Last Name
                  </label>
                  <input
                    name="lastName"
                    id="lastName"
                    type="text"
                    placeholder="Last Name"
                    value={this.state.fields.lastName}
                    onChange={this.handleChange}
                    autoComplete="off"
                    required
                    data-msg="Please enter your last name"
                    class="form-control"
                  />
                </div>
                <div className="errorMsg">{this.state.errors.lastName}</div>
                {/* Mangaer Email */}
                <div class="form-group">
                  <label for="email" class="form-label">
                    Email Address
                  </label>
                  <input
                    name="email"
                    id="email"
                    type="email"
                    placeholder="name@address.com"
                    value={this.state.fields.email}
                    onChange={this.handleChange}
                    autoComplete="off"
                    required
                    data-msg="Please enter your email"
                    class="form-control"
                  />
                </div>
                <div className="errorMsg">{this.state.errors.email}</div>
                   {/* Manger Password */}
                <div class="form-group">
                  <label for="password" class="form-label">
                    {" "}
                    Password
                  </label>
                  <input
                    name="password"
                    id="password"
                    placeholder="Password"
                    value={this.state.fields.password}
                    onChange={this.handleChange}
                    type="password"
                    required
                    data-msg="Please enter your password"
                    class="form-control"
                  />
                  <div className="errorMsg">{this.state.errors.password}</div>
                </div>
                 {/* Confirm password */}
                <div class="form-group mb-4">
                  <label for="password2" class="form-label">
                    Confirm your password
                  </label>
                  <input
                    name="password2"
                    id="password2"
                    placeholder="Password"
                    type="password"
                    required
                    value={this.state.fields.password2}
                    onChange={this.handleChange}
                    data-msg="Please enter your password"
                    class="form-control"
                  />
                </div>
                <button type="submit" class="btn btn-lg btn-block btn-primary">
                  Submit Form
                </button>
                <hr />
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
