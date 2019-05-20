import React from "react";
import Search from "../tracks/Search";
import Feature from "./Feature";
import Recommend from "./Recommend";
import Member from "./Member";

const Index = props => {
  return (
    <React.Fragment>
      <Search
        handleSubmit={props.handleSubmit}
        onSearchChange={props.onSearchChange}
        restList={props.restList}
      />
      <Feature />
      <Recommend />
      <Member />
    </React.Fragment>
  );
};

export default Index;
