import React from "react";
import { Redirect } from "react-router-dom";

const Search = props => {
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
                  <form onSubmit={props.handleSubmit}>
                    <div className="row ">
                      <div className="col-xl-10 d-flex align-items-center form-group divider">
                        <input
                          type="text"
                          name="search"
                          placeholder="What are you searching for?"
                          className="form-control border-0"
                          onChange={props.onSearchChange}
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

                  {props.restList.length > 0 && (
                    <Redirect
                      to={{
                        pathname: "/search"
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
};

export default Search;
