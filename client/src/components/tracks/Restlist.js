import React from "react";
import Rests from "./Rests";

const RestList = props => {
  const { results } = props.location.list;
  console.log(props);
  return (
    <div className="container">
      <div className="row my-5">
        <div className="col-sm-8">
          <p className="subtitle letter-spacing-4 mb-1 mt-5 text-shadow">
            EAT LIKE A LOCAL
          </p>
          <h4>Popular Restarants</h4>
        </div>
        <div className="col-sm-4 d-flex mt-5 justify-content-end">
          <p>
            <strong>{results.length}</strong> results found
          </p>
        </div>
      </div>
      <div className="row">
        {results.map(item => (
          <Rests key={item.restaurant.id} rest={item.restaurant} />
        ))}
      </div>
    </div>
  );
};

export default RestList;
