import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

const MyMaps = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={14}
      defaultCenter={{
        lat: props.listLocation[0].restaurant_latitude,
        lng: props.listLocation[0].restaurant_longitude
      }}
    >
      {props.isMarkerShown &&
        props.listLocation.map(rest => (
          <Marker
            key={rest.restaurant_id}
            position={{
              lat: rest.restaurant_latitude,
              lng: rest.restaurant_longitude
            }}
          />
        ))}
    </GoogleMap>
  ))
);

export default MyMaps;
// restaurant_latitude
// restaurant_longitude

// -34.8968227
// 138.5651569

// props.listLocation[0].restaurant_latitude
// props.listLocation[0].restaurant_latitude
