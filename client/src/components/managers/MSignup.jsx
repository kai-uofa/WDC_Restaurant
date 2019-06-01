import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email : "",
      password : "",
      password2: "",
      resName: "",
      resAdress: "",
      capacity:"",
      description: "",
      errors: {}, // collect errors for validateForm
    };
  }

  handleChange = e => {
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
    if(e.target.name == 'resName') {
      this.setState({resName: e.target.value});
    }
    if (e.target.name == 'resAdress'){
      this.setState({resAdress :e.target.value});
    }
    if(e.target.name == 'capacity') {
      this.setState({capacity: e.target.value});
    }
    if (e.target.name == 'description'){
      this.setState({description:e.target.value});
    }
  };

  validateForm() {
    let firstName = this.state.firstName;
    let lastName = this.state.lastName;
    let email = this.state.email;
    let password = this.state.password;
    let password2 = this.state.password2;
    let resName = this.state.resName;
    let resAdress = this.state.resAdress;
    let errors = {};
    let formIsValid = true;
    // Restaurant Name validation
    if (resName === "") {
      formIsValid = false;
      errors["resName"] = "*Please enter your Restaurant Name.";
    }
    if (resName.length < 3) {
      formIsValid = false;
      errors["resName"] = "Please enter at least 3 character.";
    }
    // Restaurant adress validation
    if (resAdress === "") {
      formIsValid = false;
      errors["resAdress"] = "*Please enter your Restaurant Location.";
    }

      if (resAdress.length < 3) {
        formIsValid = false;
        errors["resAdress"] = "Please enter at least 3 character.";
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
        .post("https://localhost:5443/managers/signup", {
          resName : this.state.restName,
          resAdress : this.state.resAdress,
          capacity : this.state.capacity,
          description : this.state.description,
          firstName : this.state.firstName,
          lastName : this.state.lastName,
          email : this.state.email,
          password : this.state.password,
          password2 : this.state.password2
        })
        .then(res => {
          // TODO: handle server response codes 200, 409, 401
          console.log(res);
        })
        .catch(console.error);
      
      // Reset all text fields
    
      this.setState({ resName: '',
      resAdress: '',
      capacity: '',
      description: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      password2: '' });
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
                    value={this.state.resName}
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
                    value={this.state.resAdress}
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
                    value={this.state.capacity}
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
                    value={this.state.description}
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
                    value={this.state.firstName}
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
                    value={this.state.lastName}
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
                    value={this.state.email}
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
                    value={this.state.password}
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
                    value={this.state.password2}
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
