import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "./context";

import NavBar from "./components/layout/Navbar";
import SignIn from "./components/layout/Signin";
import SignUp from "./components/layout/Signup";
import Index from "./components/layout/Index";
import Detailrest from "./components/tracks/Detailrest";
import Restlist from "./components/tracks/Restlist";

class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
          <React.Fragment>
            <NavBar />
            <Switch>
              <Route exact path="/" component={Index} />
              <Route path="/signin" component={SignIn} />
              <Route path="/signup" component={SignUp} />
              <Route
                exact
                path="/search/restaurants/:id"
                component={Detailrest}
              />
              <Route exact path="/search" component={Restlist} />
            </Switch>
          </React.Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
