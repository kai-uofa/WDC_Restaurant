import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

const MyMap = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={13}
      defaultCenter={{
        lat: props.lat,
        lng: props.lng
      }}
    >
      {props.isMarkerShown && (
        <Marker
          position={{
            lat: props.lat,
            lng: props.lng
          }}
        />
      )}
    </GoogleMap>
  ))
);

export default MyMap;

// parseFloat(props.currentLocation.latitude),
// parseFloat(props.currentLocation.longitude)
