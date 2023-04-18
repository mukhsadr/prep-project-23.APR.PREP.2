import React from "react";
import { useState } from "react";
import "../AirQuality.css";

export default function AirQuality(props) {
    const [lat, setLat] = useState(null);
    const [lon, setLong] = useState(null);
    const [aqi, setAQI] = useState(null); 
    var city = props.city;

    if (city === "Your location") {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log("you are here", position)
        let coordX = position.coords.latitude
        let coordY = position.coords.longitude
        console.log(coordX, coordY)
        fetch(
          "https://api.openweathermap.org/geo/1.0/reverse?lat="
          + coordX + "&lon=" + coordY +
          "&appid=" +
          process.env.REACT_APP_APIKEY
        ).then((res) => { return res.json() }).then((result) => {
          console.log(result);
          console.log("city:", result[0].name)
          city = result[0].name;
        })
      }, (err) => {
        console.log("Error:")
        console.log(err)
      });
    }

    fetch(
        "http://api.openweathermap.org/geo/1.0/direct?q="
        + city +
        "&appid=" +
        process.env.REACT_APP_APIKEY
      ).then((res) =>
      {return res.json()}).then((result)=> {
        console.log(result);
        console.log("city:", result[0].name)
        setLat(result[0].lat);
        setLong(result[0].lon);
      }
      );
      fetch(
        "http://api.openweathermap.org/data/2.5/air_pollution?lat="
        + lat + "&lon=" + lon +  
        "&appid=" +
        process.env.REACT_APP_APIKEY
      ).then((res) =>
      {return res.json()}).then((result)=> {
        console.log(result);
        setAQI(result.list[0].main.aqi);
        console.log("aqi: ", result.list[0].main.aqi);
      });
   
      if (city != null) {
      if (aqi == 1) {
      return (
          <>
        <span>Air quality: </span>
        <a href="#"><span class="circleGreen">{aqi}</span></a>
        </>
      );
      } else if (aqi == 2) {
        return (
          <>
        <span>Air quality: </span>
        <a href="#"><span class="circleYellow">{aqi}</span></a>
        </>
      );
      } else if (aqi == 3) {
        return (
          <>
        <span>Air quality: </span>
        <a href="#"><span class="circleOrange">{aqi}</span></a>
        </>
      );
      } else if (aqi == 4) {
        return (
          <>
        <span>Air quality: </span>
        <a href="#"><span class="circleRed">{aqi}</span></a>
        </>
      );
      } else if (aqi == 5) {
        return (
          <>
        <span>Air quality: </span>
        <a href="#"><span class="circlePurple">{aqi}</span></a>
        </>
      );
      } else {
        return (  <>
          <span>Air quality: Loading... </span>
          </>);
      }
    }
    else {
      return (
        <>
      <span>Air quality: Loading...</span>
      </>
      );
    }   
}