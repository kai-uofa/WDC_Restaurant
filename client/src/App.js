import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import moment from "moment";
import axios from "axios";
import jwtDecode from "jwt-decode";
import NavBar from "./components/layout/Navbar";
import SignIn from "./components/layout/Signin";
import SignUp from "./components/layout/Signup";
import Logout from "./components/layout/Logout";
import Index from "./components/layout/Index";
import Detailrest from "./components/tracks/Detailrest";
import Restlist from "./components/tracks/Restlist";
import Profile from "./components/tracks/Profile";
import MSignUp from "./components/managers/MSignup";
import MSignIn from "./components/managers/MSignin";
import MIndex from "./components/managers/MIndex";
import Notfound from "./components/layout/Notfound";

// self-executable function that attach Authorization header for all axios requests
(function() {
  let jwt = localStorage.getItem("token");
  if (jwt) {
    axios.defaults.headers.common["Authorization"] = jwt;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
})();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      rest_list: [],
      location: {
        lat: null,
        lng: null
      }
    };
    //google api to get current location users
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

  //submit search form
  handleOnClick = (e, history) => {
    e.preventDefault();
    if (e.target.value === undefined) {
      this.setState({ searchText: "" });
    }
    axios
      .get(
        `/search?search=${this.state.searchText}&lat=-34.92866&lng=138.59863`
      )
      .then(res => {
        this.setState({ rest_list: res.data });
        let path = `/search/restaurants-near-me`;
        history.push(path);
      })
      .catch(err => console.log(err));
    e.currentTarget.reset();
  };

  handleOnQuickBooking = e => {
    e.preventDefault();
    const time = new Date();
    const start_time = moment(time)
      .add(1, "hours")
      .format("YYYY-MM-DD HH:MM:SS")
      .toLocaleString("en-GB");
    axios
      .post("/search/quickbooking", {
        lat: -34.92866,
        lng: 138.59863,
        no_of_people: 2,
        email: this.state.user.email,
        firstName: this.state.user.firstName,
        lastName: this.state.user.lastName,
        date: new Date(),
        start_time,
        status: 1
      })
      .then(res => {
        window.location = "/profile";
      })
      .catch(console.error);
  };

  componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      this.setState({ user });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { user } = this.state;
    console.log(this.state.location.lat);
    console.log(this.state.location.lng);
    return (
      <Router>
        <React.Fragment>
          <NavBar
            user={this.state.user}
            onQuickBooking={this.handleOnQuickBooking}
          />
          <Switch>
            <Route path="/search/restaurants/:id" component={Detailrest} />
            <Route
              path={`/search/:term`}
              render={() => <Restlist restList={this.state.rest_list} />}
            />
            <Route
              path="/profile"
              render={props => {
                return <Profile {...props} />;
              }}
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
            <Route path="/logout" component={Logout} />
            <Route
              path="/signin"
              render={props => {
                if (user) return <Redirect to="/" />;
                return <SignIn {...props} />;
              }}
            />
            <Route
              path="/signup"
              render={props => {
                if (user) return <Redirect to="/" />;
                return <SignUp {...props} />;
              }}
            />
            <Route path="/managers/signup" component={MSignUp} />
            <Route path="/managers/signin" component={MSignIn} />
            <Route path="/managers" component={MIndex} />
            <Route path="*" component={Notfound} />
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;

/* <Route path="/signup" component={SignUp} />
            <Route path="/signin" component={SignIn} /> */
