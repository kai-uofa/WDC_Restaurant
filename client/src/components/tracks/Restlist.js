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
