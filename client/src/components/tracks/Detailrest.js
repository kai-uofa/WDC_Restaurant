import React, { Component } from "react";
import axios from "axios";

class Detailrest extends Component {
  state = {
    detail: []
  };

  componentDidMount() {
    axios
      .get(
        `https://developers.zomato.com/api/v2.1/restaurant?res_id=${
          this.props.match.params.id
        }&apikey=51b7e1ab05b391b0e31af2e5160523a5`
      )
      .then(res => {
        this.setState({ detail: res.data });
      })
      .catch(err => console.log(err));
  }
  render() {
    const { detail } = this.state;
    return (
      <React.Fragment>
        <div className="container">
          <section className="pt-5">
            <div className="mt-5 mb-lg-0">
              <h2 className="text-shadow verified">{detail.name}</h2>
              <p>
                <i className="fa-map-marker-alt fas mr-2" />
                {detail.cuisines}
              </p>
            </div>
          </section>
        </div>
      </React.Fragment>
    );
  }
}

export default Detailrest;
