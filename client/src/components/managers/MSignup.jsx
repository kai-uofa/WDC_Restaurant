import React, { Component } from "react";
import axios from "axios";
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      password2: "",
      resName: "",
      resAddress: "",
      capacity: "",
      description: "",
      wrong: "",
      errors: {} // collect errors for validateForm
    };
  }

  handleChange = e => {
    if (e.target.name === "firstName") {
      this.setState({ firstName: e.target.value });
    }
    if (e.target.name === "lastName") {
      this.setState({ lastName: e.target.value });
    }
    if (e.target.name === "email") {
      this.setState({ email: e.target.value });
    }
    if (e.target.name === "password") {
      this.setState({ password: e.target.value });
    }
    if (e.target.name === "password2") {
      this.setState({ password2: e.target.value });
    }
    if (e.target.name === "resName") {
      this.setState({ resName: e.target.value });
    }
    if (e.target.name === "resAddress") {
      this.setState({ resAddress: e.target.value });
    }
    if (e.target.name === "capacity") {
      this.setState({ capacity: e.target.value });
    }
    if (e.target.name === "description") {
      this.setState({ description: e.target.value });
    }
  };

  validateForm() {
    let firstName = this.state.firstName;
    let lastName = this.state.lastName;
    let email = this.state.email;
    let password = this.state.password;
    let password2 = this.state.password2;
    let resName = this.state.resName;
    let resAddress = this.state.resAddress;
    let errors = {};
    let formIsValid = true;
    // Restaurant Name validation
    if (resName === "") {
      formIsValid = false;
      errors["resName"] = "*Please enter your Restaurant Name.";
    }
    if (resName.length < 2) {
      formIsValid = false;
      errors["resName"] = "Please enter at least 2 character.";
    }
    // Restaurant adress validation
    if (resAddress === "") {
      formIsValid = false;
      errors["resAddress"] = "*Please enter your Restaurant Location.";
    }

    if (resAddress.length < 2) {
      formIsValid = false;
      errors["resAddress"] = "Please enter at least 2 character.";
    }
    // Manger firstName
    if (!firstName.match(/^[a-zA-Z ]*$/)) {
      formIsValid = false;
      errors["firstName"] = "*Please enter alphabet characters only.";
    }

    if (firstName.length < 2) {
      formIsValid = false;
      errors["firstName"] = "Please enter at least 2 character.";
    }
    //Manager last name
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
    //manager email
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
      console.log(this.state.description);
      axios
        .post("/managers/signup", {
          resName: this.state.resName,
          resAddress: this.state.resAddress,
          capacity: this.state.capacity,
          description: this.state.description,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          password: this.state.password
        })
        .then(res => {
          localStorage.setItem("token", res.data);
          window.location = "/managers";
        })
        .catch(error => {
          if (error.response.status === 200) {
            this.setState({ wrong: "" });
          } else if (error.response.status === 409) {
            this.setState({
              wrong: "This email has already been used,please try another one"
            });
          }
        });

      // Reset all text fields

      this.setState({
        resName: "",
        resAddress: "",
        capacity: "",
        description: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        password2: ""
      });
    }
  };

  render() {
    return (
      <div>
        <div className="w-100 py-5 px-md-5 px-xl-6 position-relative">
          <div>
            <br />
            <br />
            <h2>Get started with Us</h2>
            <p>
              Tell us a little about you and your restaurant, and we’ll contact
              you via phone or email to provide information about WDC products
              and services.
            </p>
          </div>
          {/* <div class="container py-5"> */}
          <div style={{ color: "red" }}>{this.state.wrong}</div>
          <div class="row">
            <div class="col-md-10 mx-auto">
              <div class="container py-5">
                <div class="row">
                  <div class="col-md-10 mx-auto">
                    <form
                      className="form-validate"
                      method="post"
                      onSubmit={this.normalSignUp}
                    >
                      <div class="form-group row">
                        <div class="col-sm-6">
                          <label htmlFor="resName">Restaurant Name</label>
                          <input
                            name="resName"
                            id="resName"
                            type="text"
                            placeholder="Restaurant Name"
                            value={this.state.resName}
                            onChange={this.handleChange}
                            autoComplete="off"
                            required
                            data-msg="Please enter your Restaurant Name"
                            class="form-control"
                          />
                          <div className="errorMsg">
                            {this.state.errors.resName}
                          </div>
                        </div>

                        <div class="col-sm-6">
                          <label htmlFor="firstName" class="form-label">
                            Manager First Name
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
                            class="form-control"
                          />
                          <div className="errorMsg">
                            {this.state.errors.firstName}
                          </div>
                        </div>
                      </div>
                      {/* here2 */}
                      <div class="form-group row">
                        {/* Restaurant Location */}
                        <div class="col-sm-6">
                          <label for="resAddress" class="form-label">
                            Address
                          </label>
                          <input
                            name="resAddress"
                            id="resAddress"
                            type="text"
                            placeholder="Restaurant Location"
                            value={this.state.resAddress}
                            onChange={this.handleChange}
                            autoComplete="off"
                            required
                            data-msg="Please enter your Restaurant Location"
                            class="form-control"
                          />
                          <div className="errorMsg">
                            {this.state.errors.resAddress}
                          </div>
                        </div>
                        {/* Manager Last Name */}
                        <div class="col-sm-6">
                          <label for="lastName" class="form-label">
                            Manager Last Name
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
                            class="form-control"
                          />
                          <div className="errorMsg">
                            {this.state.errors.lastName}
                          </div>
                        </div>
                      </div>
                      {/* here3 */}
                      <div class="form-group row">
                        {/* Capacity */}
                        <div class="col-sm-6">
                          <label for="capacity" class="form-label">
                            Capacity
                          </label>
                          <input
                            name="capacity"
                            id="capacity"
                            type="number"
                            min="0"
                            placeholder="How big is your restaurant ??"
                            value={this.state.capacity}
                            onChange={this.handleChange}
                            autoComplete="off"
                            required
                            data-msg="How many customer your Restaurant can hold"
                            class="form-control"
                          />
                          <div className="errorMsg">
                            {this.state.errors.capacity}
                          </div>
                        </div>
                        {/* Manager Email */}
                        <div class="col-sm-6">
                          <label for="email" class="form-label">
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
                            class="form-control"
                          />
                          <div className="errorMsg">
                            {this.state.errors.email}
                          </div>
                        </div>
                      </div>
                      {/* here4 */}
                      <div class="form-group row">
                        {/* Restaurant description */}
                        <div class="col-sm-6">
                          <label for="password" class="form-label">
                            Restaurant Description (Optional)
                          </label>
                          <textarea
                            name="description"
                            id="description"
                            style={{ height: "110px" }}
                            placeholder="Tell us about your Restaurant"
                            value={this.state.description}
                            onChange={this.handleChange}
                            type="text"
                            data-msg="Please  enter your description"
                            class="form-control"
                          />
                        </div>
                        {/* Password */}
                        <div class="col-sm-6">
                          <label for="password" class="form-label">
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
                            class="form-control"
                          />
                          <div className="errorMsg">
                            {this.state.errors.password}
                          </div>
                          {/* Password2 */}

                          <label for="password2" class="form-label">
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
                            class="form-control"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        class="btn btn-lg btn-block btn-primary"
                      >
                        Submit Form
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-4 col-lg-6 col-xl-7 d-none d-md-block">
          <div class="background-signin bg-cover h-100 mr-n3" />
        </div>
      </div>
    );
  }
}

export default SignUp;
