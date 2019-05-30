import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import NavBar from "./components/layout/Navbar";
import SignIn from "./components/layout/Signin";
import SignUp from "./components/layout/Signup";
import Index from "./components/layout/Index";
import Detailrest from "./components/tracks/Detailrest";
import Restlist from "./components/tracks/Restlist";
import MSignUp from "./components/managers/MSignup";
import MSignIn from "./components/managers/MSignin";
import MIndex from "./components/managers/MIndex";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      rest_list: [],
      location: {
        lat: null,
        lng: null
      },
      isSignIn: false
    };
    window.navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        });
      },
      err => console.log(err)
    );
  }

  onSearchChange = e => {
    this.setState({ searchText: e.target.value });
  };

  handleOnClick = (e, history) => {
    e.preventDefault();
    if (e.target.value === undefined) {
      this.setState({ searchText: "" });
    }
    axios
      .get(
        `https://localhost:5443/search?search=${
          this.state.searchText
        }&lat=-34.92866&lng=138.59863`
      )
      .then(res => {
        this.setState({ rest_list: res.data });
        let path = `/search/restaurants-near-me`;
        history.push(path);
      })
      .catch(err => console.log(err));
    e.currentTarget.reset();
  };

  render() {
    return (
      <Router>
        <React.Fragment>
          <NavBar isSignIn={this.state.isSignIn} />
          <Switch>
            <Route path="/search/restaurants/:id" component={Detailrest} />
            <Route
              path={`/search/:term`}
              render={() => <Restlist restList={this.state.rest_list} />}
            />
            <Route
              exact
              path="/"
              render={props => (
                <Index
                  history={props.history}
                  onSearchChange={this.onSearchChange}
                  restList={this.state.rest_list}
                  handleOnClick={this.handleOnClick}
                />
              )}
            />
            <Route path="/signin" component={SignIn} />
            <Route
              path="/signup"
              render={props => (
                <SignUp {...props} isSignIn={this.state.isSignIn} />
              )}
            />
            <Route path="/managers/signup" component={MSignUp} />
            <Route path="/managers/signin" component={MSignIn} />
            <Route path="/managers" component={MIndex} />
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
