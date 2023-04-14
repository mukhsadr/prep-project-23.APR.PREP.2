import "./App.css";
  
  function errorCallback (error) {
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
    console.log(error, detailError);
  }

  const successCallback = (position) => {
    console.log(position);
  };

  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

  
  export default function getURL() {
    navigator.geolocation.getCurrentPosition(function(position){
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    generateURL(lat, long);
    })

}

function generateURL(lat, long) {
  var URL = 'http://example.com/?lat=' + lat + '&long=' + long;
  console.log(URL)
}