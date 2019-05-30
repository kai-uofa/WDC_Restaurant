import React from "react";
const { compose, withStateHandlers } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} = require("react-google-maps");

const MyMap = compose(
  withStateHandlers(
    () => ({
      isOpen: false
    }),
    {
      onToggleOpen: ({ isOpen }) => () => ({
        isOpen: !isOpen
      })
    }
  ),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    defaultZoom={14}
    defaultCenter={{ lat: props.lat, lng: props.lng }}
  >
    <Marker
      position={{ lat: props.lat, lng: props.lng }}
      onClick={props.onToggleOpen}
    >
      {props.isOpen && (
        <InfoWindow onCloseClick={props.onToggleOpen}>
          <p>{props.detail.restaurant_name}</p>
        </InfoWindow>
      )}
    </Marker>
  </GoogleMap>
));

export default MyMap;

// import React from "react";
// import {
//   withScriptjs,
//   withGoogleMap,
//   GoogleMap,
//   Marker
// } from "react-google-maps";

// const MyMap = withScriptjs(
//   withGoogleMap(props => (
//     <GoogleMap
//       defaultZoom={13}
//       defaultCenter={{
//         lat: props.lat,
//         lng: props.lng
//       }}
//     >
//       {props.isMarkerShown && (
//         <Marker
//           position={{
//             lat: props.lat,
//             lng: props.lng
//           }}
//         />
//       )}
//     </GoogleMap>
//   ))
// );

// export default MyMap;

// parseFloat(props.currentLocation.latitude),
// parseFloat(props.currentLocation.longitude)
