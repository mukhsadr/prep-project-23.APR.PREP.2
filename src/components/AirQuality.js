import React from "react";
import { useState } from "react";
import "../AirQuality.css";

export default function AirQuality(airQualityIndex) {
      const aqi = airQualityIndex.airQualityIndex
      if (aqi != null) {
      if (aqi == 1) {
      return (
          <>
        <a href="#"><span class="circleGreen">{aqi}</span></a>
        </>
      );
      } else if (aqi == 2) {
        return (
          <>
        <a href="#"><span class="circleYellow">{aqi}</span></a>
        </>
      );
      } else if (aqi == 3) {
        return (
          <>
        <a href="#"><span class="circleOrange">{aqi}</span></a>
        </>
      );
      } else if (aqi == 4) {
        return (
          <>
        <a href="#"><span class="circleRed">{aqi}</span></a>
        </>
      );
      } else if (aqi == 5) {
        return (
          <>
        <a href="#"><span class="circlePurple">{aqi}</span></a>
        </>
      );
      } else {
        return (  <>
          <span>0</span>
          </>);
      }
    }
    else {
      return (
        <>
      <span>0</span>
      </>
      );
    }   
}