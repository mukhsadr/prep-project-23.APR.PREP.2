import { GoogleMap, Marker } from "@react-google-maps/api";
import React, { useState, useEffect } from "react";
import "./Map.css";
import { useWeatherContext } from "../../store/WeatherContext";

function Map(props) {
  const { location, setLocation, city, setCity } = useWeatherContext();
  const [markerPosition, setMarkerPosition] = useState(location); // store marker position in state
  const containerStyle = {
    width: "80%",
    height: "300px",
    borderRadius: "7%",
    margin: "0 auto",
    position: "relative",
  };

  useEffect(() => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: props.city }, (results, status) => {
      if (status === "OK") {
        const lat = results[0].geometry.location.lat();
        const lng = results[0].geometry.location.lng();
        setLocation({ lat, lng });
        setMarkerPosition({ lat, lng });
      } else {
        console.error("Geocode was not successful for the following reason: ", status);
      }
    });
    setCity(props.city);
  }, [props.city, setLocation, setCity]);

  const center = {
    lat: location.lat,
    lng: location.lng,
  };

  const onMapLoad = () => {
    console.log("Map loaded!");
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
        if (result.address && result.address.city) {
          // Only set city and location if the selected location has a city in the address
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
    setLocation({ lat: parseFloat(lat), lng: parseFloat(lng) });
    setMarkerPosition({ lat: parseFloat(lat), lng: parseFloat(lng) }); // update marker position
  };

  const options = {
    mapTypeId: "terrain", // choose from roadmap, satellite, hybrid, terrain
    zoomControl: true,
    zoom: 7,
    streetViewControl: true,
    styles: [
      // This is an array of objects that define the visual styles for different features on the map.
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
        ],
      },
      {
        featureType: "all",
        elementType: "geometry",
        stylers: [
          { hue: "#00bfff" },
          { saturation: -40 },
          { lightness: 0 },
          { visibility: "on" },
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
    <div style={containerStyle}>
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
        <Marker position={markerPosition} />
      </GoogleMap>
    </div>
  );
}

export default Map;

/**
 * 
 *       <form
        onSubmit={handleSubmit}
        style={{
          position: "absolute",
          top: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1,
        }}
      >
        <Autocomplete
          onLoad={(autocomplete) => setAutocomplete(autocomplete)}
          onPlaceChanged={() => {
            const place = autocomplete.getPlace();
            console.log(place);
            if (place.geometry) {
              onLocationSelect(
                place.geometry.location.lat(),
                place.geometry.location.lng()
              );
            }
          }}
          types={["(cities)"]}
        >
          <input
            ref={searchInputRef}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            id="pac-input"
            className="controls"
            type="text"
            placeholder="Enter your location"
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `240px`,
              height: `32px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
              position: "relative",
              zIndex: 2,
            }}
          />
        </Autocomplete>
      </form>

        const handleSubmit = (e) => {
    e.preventDefault();
    if (searchValue && autocomplete) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: searchValue }, (results, status) => {
        if (status === "OK" && results && results[0].geometry) {
          const location = {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng(),
          };
          onLocationSelect(location.lat, location.lng);
          setSearchValue(results[0].formatted_address);
          searchInputRef.current.blur();
        } else {
          console.error(
            "Geocode was not successful for the following reason: ",
            status
          );
        }
      });
    }
  };
 */