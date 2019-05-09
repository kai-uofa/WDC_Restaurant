import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./components/homepage";
import NavBar from "./components/navbar";
import SignIn from "./components/signin";
import SignUp from "./components/signup";

class App extends Component {
  // constructor(props) {
  //     super(props);
  //     this.state = { apiResponse: "" };
  // }
  // callAPI() {
  //     fetch('http://localhost:5000/users')
  //         .then(res => res.text())
  //         .then(res => this.setState({ apiResponse: res }));
  // }
  // componentWillMount() {
  //     this.callAPI();
  // }
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Switch>
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/" component={HomePage} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
