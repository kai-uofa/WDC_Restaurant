import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";

import NavBar from "./components/layout/Navbar";
import SignIn from "./components/layout/Signin";
import SignUp from "./components/layout/Signup";
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

  handleSubmit = e => {
    e.preventDefault();
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
    axios
      .get(
        `https://developers.zomato.com/api/v2.1/search?q=${
          this.state.searchText
        }&apikey=51b7e1ab05b391b0e31af2e5160523a5`
      )
      .then(res => {
        console.log(res.data);
        this.setState({ rest_list: res.data.restaurants });
      })
      .catch(err => console.log(err));
    e.currentTarget.reset();
  };

  render() {
    return (
      <Router>
        <React.Fragment>
          <NavBar />
          <Switch>
            <Route path="/search/restaurants/:id" component={Detailrest} />
            <Route
              path="/search"
              render={() => <Restlist restList={this.state.rest_list} />}
            />
            <Route
              exact
              path="/"
              render={() => (
                <Index
                  handleSubmit={this.handleSubmit}
                  onSearchChange={this.onSearchChange}
                  restList={this.state.rest_list}
                />
              )}
            />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
