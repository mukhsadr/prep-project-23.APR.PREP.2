import "./App.css";
/*
document.addEventListener("DOMContentLoaded", event => {
  let $ = document.querySelector.bind(document);

  $("#currPos").addEventListener("click", getLocation);
  
  function getLocation() {
    let geolocation = navigator.geolocation;
    if (geolocation) {
      geolocation.getCurrentPosition(onGeoSuccess, onGeoError);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }
  
  function onGeoSuccess(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    /*
    fetch(
      "https://api.openweathermap.org/data/3.0/onecall?lat="
      + lat + "&lon=" + long +
      "&appid=" +
        process.env.REACT_APP_APIKEY            
    ) 
    .then(response => response.json())
    
    return [lat, long]
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

const successCallback = (position) => {
    console.log(position);
  };
  
  const errorCallback = (error) => {
    console.log(error);
  };
  
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

  export default function getCoords() {
  var coords = navigator.geolocation.getCurrentPosition(function(position){
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    return [lat, long]
  })
    return coords
}
*/
