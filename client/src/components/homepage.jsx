import React from "react";

const HomePage = () => {
  return (
    /* //  home-page */
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
                <form action="#">
                  <div className="row ">
                    <div className="col-xl-7 d-flex align-items-center form-group divider">
                      <input
                        type="text"
                        name="search"
                        placeholder="What are you searching for?"
                        className="form-control border-0"
                      />
                    </div>
                    <div className=" col-xl-3  5mb-5d-flex align-items-center form-group d-flex">
                      <input
                        type="text"
                        name="location"
                        placeholder="Location"
                        id="location"
                        className="form-control border-0"
                      />
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
