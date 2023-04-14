import { useState } from "react";

export default function Geolocation() {
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
  fetchGeolocationData();


  return ( [geolocationData.latitude, geolocationData.longitude] );
};
