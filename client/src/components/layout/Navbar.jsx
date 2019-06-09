import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";

const NavBar = props => {
  const { user } = props;
  return (
    <header id="home">
      {/* <!-- navbar start--> */}
      <nav className="navbar navbar-expand-sm fixed-top shadow navbar-light bg-white">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={logo} width="40" height="40" alt="..." />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navBarCollapse"
            aria-controls="navBarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          {/* <!--Navbar collapse--> */}
          <div id="navBarCollapse" className="collapse navbar-collapse">
            <ul className="navbar-nav ml-auto">
              {user && (
                <li className="nav-item ">
                  <Link className="nav-link btn btn-light mr-4" to="/profile">
                    Hello {user.firstName}
                  </Link>
                </li>
              )}
              <li className="nav-item">
                <Link className="nav-link btn btn-light mr-4" to="/">
                  Home
                </Link>
              </li>
              {user && (
                <li className="nav-item ">
                  <button
                    type="submit"
                    className="nav-link btn btn-light mr-4"
                    onClick={props.onQuickBooking}
                  >
                    Quick Booking
                  </button>
                </li>
              )}
              {user && (
                <li className="nav-item">
                  <Link className="nav-link btn btn-light " to="/logout">
                    Log out
                  </Link>
                </li>
              )}
              {!user && (
                <React.Fragment>
                  <li className="nav-item">
                    <Link className="nav-link btn btn-light mr-4" to="/signup">
                      Sign Up
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link btn btn-light " to="/signin">
                      Sign In
                    </Link>
                  </li>
                </React.Fragment>
              )}
            </ul>
          </div>
          {/* <!--/Navbar collapse--> */}
        </div>
      </nav>
      {/* <!-- /navbar end-->  */}
    </header>
  );
};

export default NavBar;
