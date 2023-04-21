import React, { useEffect } from "react";
import { useState } from "react";
import "../AirQuality.css";

export default function AirQuality(props) {
  const [lat, setLat] = useState(0);
  const [lon, setLong] = useState(0);
  const [aqi, setAQI] = useState(null);
  let city = props.city;

  useEffect(() => {
    console.log("props", props.lat, props.lon);
    fetch(
      "https://api.openweathermap.org/data/2.5/air_pollution?lat=" +
        props.lat +
        "&lon=" +
        props.lon +
        "&appid=" +
        process.env.REACT_APP_APIKEY
    )
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        console.log(result);
        setAQI(result.list[0].main.aqi);
        console.log("aqi: ", result.list[0].main.aqi);
      });
  }, [lat, lon]);

  if (city != null) {
    if (aqi == 1) {
      return (
        <>
          <span>Air quality: </span>
          <a href="#">
            <span class="circleGreen">{aqi}</span>
          </a>
        </>
      );
    } else if (aqi == 2) {
      return (
        <>
          <span></span>
          <a href="#">
            <span class="circleYellow">{aqi}</span>
          </a>
        </>
      );
    } else if (aqi == 3) {
      return (
        <>
          <span></span>
          <a href="#">
            <span class="circleOrange">{aqi}</span>
          </a>
        </>
      );
    } else if (aqi == 4) {
      return (
        <>
          <span></span>
          <a href="#">
            <span class="circleRed">{aqi}</span>
          </a>
        </>
      );
    } else if (aqi == 5) {
      return (
        <>
          <span></span>
          <a href="#">
            <span class="circlePurple">{aqi}</span>
          </a>
        </>
      );
    } else {
      return (
        <>
          <span>0</span>
        </>
      );
    }
  } else {
    return (
      <>
        <span>0</span>
      </>
    );
  }
}
