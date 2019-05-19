import React from "react";

const Feature = () => {
  return (
    <section className="feature bg-light pt-5">
      <div className="container">
        <div className="text-center pb-5 ">
          <h2>FEATURES</h2>
        </div>
        <div className="row">
          <div className="col-xl-4 mb-4">
            <div className="px-3 text-center">
              <div className="svg pb-3">
                <i className="fab fa-bootstrap display-4" />
              </div>
              <h3>Bootstrap</h3>
              <p className="text-muted">
                Bootstrap is an open source toolkit for developing with HTML,
                CSS, and JS. Quickly prototype your ideas or build your entire
                app with our Sass variables and mixins, responsive grid system,
                extensive prebuilt components, and powerful plugins built on
                jQuery.
              </p>
            </div>
          </div>
          <div className="col-xl-4 mb-4">
            <div className="px-3 text-center">
              <div className="svg pb-3">
                <i className="fab fa-react display-4" />
              </div>
              <h3>REACT Framework</h3>
              <p className="text-muted">
                React makes it painless to create interactive UIs. Design simple
                views for each state in your application, and React will
                efficiently update and render just the right components when
                your data changes. Declarative views make your code more
                predictable and easier to debug.
              </p>
            </div>
          </div>
          <div className="col-xl-4 mb-4">
            <div className="px-3 text-center">
              <div className="svg pb-3">
                <i className="fab fa-node-js display-4" />
              </div>
              <h3>NodeJS</h3>
              <p className="text-muted">
                As an asynchronous event driven JavaScript runtime, Node is
                designed to build scalable network applications. In the
                following "hello world" example, many connections can be handled
                concurrently. Upon each connection the callback is fired, but if
                there is no work to be done, Node will sleep.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature;
