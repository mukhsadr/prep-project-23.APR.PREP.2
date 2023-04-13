import React, { useState } from "react";

const GeolocationButton = () => {
  const [geolocationData, setGeolocationData] = useState(null);

  // Function to fetch geolocation data
  const fetchGeolocationData = async () => {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      // Extracting latitude and longitude from position object
      const { latitude, longitude } = position.coords;
      setGeolocationData({ latitude, longitude });
    } catch (error) {
      console.error("Error fetching geolocation data:", error);
    }
  };

  return (
    <div>
      <button onClick={fetchGeolocationData}>Fetch Geolocation</button>
      {geolocationData && (
        <div>
          <p>Latitude: {geolocationData.latitude}</p>
          <p>Longitude: {geolocationData.longitude}</p>
        </div>
      )}
    </div>
  );
};

export default GeolocationButton;