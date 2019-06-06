import React from "react";
import Rests from "./Rests";
import MyMaps from "./MyMaps";

const RestList = props => {
  // console.log(props.restList);
  return (
    <React.Fragment>
      <div>
        <MyMaps
          listLocation={props.restList}
          isMarkerShown
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAhIWHIyj2pudRfrZ3ST_0oP2bq1C8KLV0`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
      <section className="py-5 bg-light-100 shadow">
        <div className="container pt-5">
          <h1 className="mb-4">Adelaide</h1>
          <p className="lead mb-5">
            Adelaide is the capital city of the state of South Australia, and
            the fifth-most populous city of Australia. Adelaide is home to 77
            percent of the South Australian population, making it the most
            centralised population of any state in Australia.
          </p>
        </div>
      </section>
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
              <strong>{props.restList.length}</strong> results found
            </p>
          </div>
        </div>

        <div className="row">
          {props.restList.map(item => (
            <Rests key={item.restaurant_id} rest={item} />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default RestList;
