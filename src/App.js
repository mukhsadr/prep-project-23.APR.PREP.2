import { useEffect, useState } from "react";
import "./App.css";
import logo from "./mlh-prep.png";
import AutoComp from "./components/AutoComp";
import usePlacesAutocomplete from "use-places-autocomplete";
import { useLoadScript } from "@react-google-maps/api";
//import './location.js';
import React from 'react';

function App() {
  const [error, setError] = useState(null);
  const [isVarLoaded, setIsVarLoaded] = useState(false);
  const [city, setCity] = useState("New York City");
  const [results, setResults] = useState(null);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries: ["places"],
  });

  useEffect(() => {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric" +
        "&appid=" +
        process.env.REACT_APP_APIKEY
    )
      .then((res) => res.json())
      .then(
        (result) => {
          if (result["cod"] !== 200) {
            setIsVarLoaded(false);
          } else {
            setIsVarLoaded(true);
            setResults(result);
          }
        },
        (error) => {
          setIsVarLoaded(true);
          setError(error);
        }
      );
  }, [city]);
  const cityHandler = (city) => {
    console.log("City set to:", city);
    setCity(city);
  };
  
  document.addEventListener("DOMContentLoaded", event => {
    let $ = document.querySelector.bind(document);
    $("#currPos").addEventListener("click", getLocation);
  
    function getLocation() {
      let geolocation = navigator.geolocation;
      if (geolocation) {
        geolocation.getCurrentPosition(GetCoords, onGeoError);
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    }
    
    function GetCoords(position) {
      var lat = position.coords.latitude;
      var long = position.coords.longitude;
        fetch(
          "https://api.openweathermap.org/data/3.0/onecall?lat="
          + lat + "&lon=" + long +
          "&appid=" +
            process.env.REACT_APP_APIKEY            
        ) 
          .then((res) => res.json())
          .then(
            (result) => {
              if (result["cod"] !== 200) {
                setIsVarLoaded(false);
              } else {
                setIsVarLoaded(true);
                setResults(result);
              }
            },
            (error) => {
              setIsVarLoaded(true);
              setError(error);
            }
          );
    }
    
    function onGeoError(error) {
      let detailError;
      
      if(error.code === error.PERMISSION_DENIED) {
        detailError = "User denied the request for Geolocation.";
      } 
      else if(error.code === error.POSITION_UNAVAILABLE) {
        detailError = "Location information is unavailable.";
      } 
      else if(error.code === error.TIMEOUT) {
        detailError = "The request to get user location timed out."
      } 
      else if(error.code === error.UNKNOWN_ERROR) {
        detailError = "An unknown error occurred."
      }
      $("#error").innerHTML = `Error: ${detailError}`;
    }
  });


  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <>
        <img className="logo" src={logo} alt="MLH Prep Logo"></img>
        <div>
          <h2>Enter a city below 👇</h2>
          {isLoaded && <AutoComp cityHandler={cityHandler}></AutoComp>}
          <button id="currPos">My location</button>
          <div id="error"></div>
          <div className="Results">
            {!isVarLoaded && <h2>Loading...</h2>}
            {console.log(results)}
            {console.log(isLoaded)}
            {isVarLoaded && results && (
              <>
                <h3>{results.weather[0].main}</h3>
                <p>Feels like {results.main.feels_like}°C</p>
                <i>
                  <p>
                    {results.name}, {results.sys.country}
                  </p>
                </i>
              </>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default App;
