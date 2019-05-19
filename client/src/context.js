import React, { Component } from "react";
import axios from "axios";

const Context = React.createContext();

export class Provider extends Component {
  state = {
    rest_list: []
  };

  componentDidMount() {
    axios
      .get()
      .then(res => {
        console.log();
      })
      .catch(err => console.log());
  }
  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}
export const Consumer = Context.Consumer;
