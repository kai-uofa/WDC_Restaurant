import React, { Component } from "react";
import Search from "../tracks/Search";
import Feature from "./Feature";
import Recommend from "./Recommend";
import Member from "./Member";

class Index extends Component {
  render() {
    return (
      <React.Fragment>
        <Search />
        <Feature />
        <Recommend />
        <Member />
      </React.Fragment>
    );
  }
}

export default Index;
