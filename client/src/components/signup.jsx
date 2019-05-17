// import React from "react";
import React, { Component } from "react";
import GoogleLogin from 'react-google-login';
import {PostData} from '../PostData.js';
import {Redirect} from 'react-router-dom';
// const SignUp = () => {
  class SignUp extends Component {
    constructor() {
      super();
      this.state = {
        fields: {},
        errors: {},
        loginError: false,
       redirect: false

      }

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.signup = this.signup.bind(this);

    };


    handleChange(e) {
      let fields = this.state.fields;
      fields[e.target.name] = e.target.value;
      this.setState({
        fields
      });

    }
    handleSubmit(e) {
      e.preventDefault();
      if (this.validateForm()) {
          let fields = {};
          fields["firstName"] = "";
          fields["lastName"] = "";
          fields["email"] = "";
          fields["password"] = "";
          fields["password2"] = "";
          this.setState({fields:fields});
          alert("Form submitted");
      }

    }

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
      if (fields["firstName"].length < 3){
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
        if (fields["lastName"].length < 3){
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
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(fields["email"])) {
          formIsValid = false;
          errors["email"] = "*Please enter valid email-ID.";
        }
      }

    

      if (!fields["password"]) {
        formIsValid = false;
        errors["password"] = "*Please enter your password.";
      }

      if(fields["password"] !== fields["password2"]) {
        formIsValid = false;
        errors["password"] = "*The password is not matching";
      }
      if(fields["password"].length < 5){
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

    signup(res, type) {
      let postData;

 
     if (type === 'google' && res.w3.U3) {
     postData = {
       name: res.w3.ig,
       provider: type,
       email: res.w3.U3,
       provider_id: res.El,
       token: res.Zi.access_token,
       provider_pic: res.w3.Paa
     };
 }
 
 if (postData) {
 PostData('signup', postData).then((result) => {
    let responseJson = result;
    sessionStorage.setItem("userData", JSON.stringify(responseJson));
    this.setState({redirect: true});
 });
 } else {}
 }
 

  
  
    
    
  render() {
    if (this.state.redirect || sessionStorage.getItem('userData')) {
      return (<Redirect to={'/home'}/>)
  }
  
  
  const responseGoogle = (response) => {
      console.log("google console");
      console.log(response);
      this.signup(response, 'google');
  }
    
  return (
    <div className="container-fluid px-3">
      <div className="row min-vh-100">
        <div className="col-md-8 col-lg-6 col-xl-5 d-flex align-items-center">
          <div className="w-100 py-5 px-md-5 px-xl-6 position-relative">
            <div className="mb-4">
              <h2>Sign up</h2>
            </div>
            <form method="post" className="form-validate" onSubmit={this.handleSubmit}>
              <div className ="form-group">
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
  
              <div class ="form-group">
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
              <div class="form-group">
                <label for="loginPassword" class="form-label">
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
              <div class="form-group mb-4">
                <label for="loginPassword2" class="form-label">
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
              <button type="submit" class="btn btn-lg btn-block btn-primary" >
                Sign up
              </button>
              <hr />
              {/* <button className="g-signin2" className="btn btn-outline-secondary mb-3 btn-block text-center" data-onsuccess="onSignIn">
                <span class="d-sm-inline text-dark">Connect with Google</span>
              </button> */}
              {/* <div className="g-signin2" data-onsuccess="onSignIn"></div> */}
            </form>
            <GoogleLogin
    clientId="89188414152-adct1ksocrdfh2mqqlki7ps2rd1smhaf.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
  />,
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
