import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
class Search extends Component {
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
    axios
      .get(
        `http://localhost:5000/search?q=${
          this.state.searchText
        }`
      )
      .then(res => {
        console.log(res);
        this.setState({ rest_list: res.data });
      })
      .catch(err => console.log(err));
    e.currentTarget.reset();
  };
  render() {
    return (
      <React.Fragment>
        <section className="home-page py-6">
          <div className="home-inner">
            <div className="container py-6 py-md-7 text-white">
              <div className="row">
                <div className="col-xl-10">
                  <div className="caption text-center text-xl-left">
                    <p className="subtitle letter-spacing-4 mb-2 text-shadow">
                      THE BEST RESTAURSNT EXPERIENCE
                    </p>
                    <h1 className="display-3 font-weight-bold text-shadow">
                      Discover and Book
                    </h1>
                  </div>
                  <div className="search-bar mt-5 p-3 p-xl-1 pl-xl-4">
                    <form onSubmit={this.handleSubmit}>
                      <div className="row ">
                        <div className="col-xl-10 d-flex align-items-center form-group divider">
                          <input
                            type="text"
                            name="search"
                            placeholder="What are you searching for?"
                            className="form-control border-0"
                            onChange={this.onSearchChange}
                          />
                          {/* Search by location */}
                          <a href="...">
                            <i className="far fa-compass" />
                          </a>
                        </div>
                        <div className="col-xl-2 d-flex align-items-center ">
                          <button
                            type="submit"
                            className="btn btn-primary btn-block rounded-xl h-100 "
                          >
                            Search{" "}
                          </button>
                        </div>
                      </div>
                    </form>

                    {this.state.rest_list.length > 0 && (
                      <Redirect
                        to={{
                          pathname: "/search",
                          list: { results: this.state.rest_list }
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default Search;
