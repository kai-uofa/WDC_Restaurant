import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.jpeg";

const NavBar = () => {
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
              <li className="nav-item">
                <Link className="nav-link" exact to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signup">
                  Sign Up
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signin">
                  Sign In
                </Link>
              </li>
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
