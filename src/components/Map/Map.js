import React, { useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

function Map({ location, onMapLoad, setCity, setLocation }) {
  
  const containerStyle = {
    width: "80%",
    height: "400px",
    borderRadius: "7%",
    margin: "0 auto",
    marginTop: "20px",
  };

  const center = {
    lat: location.lat,
    lng: location.lng,
  };

  const onLocationSelect = (lat, lng) => {
    console.log("Location selected:", lat, lng);
    fetch(
      "https://nominatim.openstreetmap.org/reverse?format=json&lat=" +
        lat +
        "&lon=" +
        lng +
        "&zoom=18&addressdetails=1"
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.address && result.address.city) { // Only set city and location if the selected location has a city in the address
          console.log("city:", result.address.city);
          setCity(result.address.city);
          setLocation({ lat: parseFloat(lat), lng: parseFloat(lng) });
        } else {
          console.log("No city found for selected location");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

const options = {
  mapTypeId: "terrain", // choose from roadmap, satellite, hybrid, terrain
  zoomControl: false,
  zoom: 7,
  streetViewControl: false,
  styles: [ // This is an array of objects that define the visual styles for different features on the map.
    {
      featureType: "administrative.locality", //. The first object in the array targets the "administrative.locality" feature type (which represents cities and towns)
      elementType: "labels.text.fill", //sets the "labels.text.fill" element to be visible. 
      stylers: [
        { visibility: "on" },
        { color: "#ff0000" },
        { weight: 13 },
        { gamma: 0.8 },
        { saturation: 50 },
        { lightness: 0 },
        { invert_lightness: false },
        { cursor: "crosshair" }, // add this to change cursor on cities
      ],
    },
    {
      featureType: "road", //"road" feature type
      elementType: "geometry", //sets the "geometry" element to be invisible
      stylers: [{ visibility: "off" }], //This means that roads will not be displayed on the map.
    },
    {
      featureType: "poi.business", //"poi.business" feature type (business icons)
      elementType: "labels.icon", // sets the "labels.icon" element to be invisible
      stylers: [{ visibility: "off" }], //This means that business icons will not be displayed on the map.
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [{ visibility: "off" }],
    },
  ],
};

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      options={options}
      onLoad={onMapLoad}
      onClick={(event) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        onLocationSelect(lat, lng);
      }}
    >
      <Marker position={center} />
    </GoogleMap>
  );
}

export default Map;