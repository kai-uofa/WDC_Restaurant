import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import NavBar from "./components/layout/Navbar";
import SignIn from "./components/layout/Signin";
import SignUp from "./components/layout/Signup";
import MSignUp from "./components/manager/MSignup";
import Index from "./components/layout/Index";
import Detailrest from "./components/tracks/Detailrest";
import Restlist from "./components/tracks/Restlist";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      rest_list: []
    };
  }

  onSearchChange = e => {
    this.setState({ searchText: e.target.value });
  };

  handleOnClick = (e, history) => {
    e.preventDefault();
    axios
      .get(
        `https://developers.zomato.com/api/v2.1/search?q=${
          this.state.searchText
        }
    }&apikey=51b7e1ab05b391b0e31af2e5160523a5`
      )
      .then(res => {
        console.log(res.data);
        this.setState({ rest_list: res.data.restaurants });
        let path = `/search/${this.state.searchText}`;
        history.push(path);
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Router>
        <React.Fragment>
          <NavBar />
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
            <Route path="/signup" component={SignUp} />
            <Route path="/manager/signup" component={MSignUp} />
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;

// axios
//   .get(
//     `http://localhost:5000/search?q=${
//       this.state.searchText
//     }`
//   )
//   .then(res => {
//     console.log(res);
//     this.setState({ rest_list: res.data });
//   })
//   .catch(err => console.log(err));
// e.currentTarget.reset();
