import { useEffect, useState } from "react";

import "./../App.css";
import logo from "./../mlh-prep.png";
import AutoComp from "./AutoComp";
import React from "react";
import TempConvert from "./TempConvert";
import { useWeatherContext } from "../store/WeatherContext";
import TopBar from "./TopBar";
import { Grid } from "@mui/material";

import sunny_img from "../sunny.png";
import snow_img from "../snow.png"
import rain_img from "../Rain.png";
import thunderstorm_img from "../Thunderstorm.png";
import cloudy_img from "../Cloudy.webp"
import unknown_img from "../unknown.jpg"

function InitialScreen() {
  const { temp, unit, isLoaded, results, error, isVarLoaded, changeScreen } =
    useWeatherContext();

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <Grid container direction={"column"}>
        <TopBar></TopBar>
        <Grid
          xs={10}
          maxWidth={"100%"}
          minWidth={"100%"}
          paddingTop={"50px"}
          align={"center"}
        >
          <div
            className="Results"
            onClick={changeScreen}
            style={{ maxWidth: "50%" }}
          >
            {!isVarLoaded && <h2>Loading...</h2>}
            {console.log(results)}
            {console.log(isLoaded)}
            {isVarLoaded && results && (
              <>
                <h3>{results.weather[0].main}</h3>
                {temp ? (
                  <p>
                    Feels like {temp.toFixed(2)}°{unit}
                  </p>
                ) : null}
                <i>
                  <p>
                    {results.name}, {results.sys.country}
                  </p>
                </i>
              </>
            )}
          </div>

          <div style={{ 
              width: '100%',
              height: '500px',
              overflowX: 'auto',
              whiteSpace: 'nowrap',
              }}>
            <div style={{ display: 'inline-block', padding: '10px' }}><BigCard city={"London, UK"}/></div>
            <div style={{ display: 'inline-block', padding: '10px' }}><BigCard city={"London, UK"}/></div>
            <div style={{ display: 'inline-block', padding: '10px' }}><BigCard city={"London, UK"}/></div>
            <div style={{ display: 'inline-block', padding: '10px' }}><BigCard city={"London, UK"}/></div>
            <div style={{ display: 'inline-block', padding: '10px' }}><BigCard city={"London, UK"}/></div>
            <div style={{ display: 'inline-block', padding: '10px' }}><BigCard city={"London, UK"}/></div>
          </div>
        </Grid>
      </Grid>
    );
  }
}

export default InitialScreen;

export function BigCard({city}) {
  const [error, setError] = useState(null);
  const [isVarLoaded, setIsVarLoaded] = useState(false);
  const [results, setResults] = useState(null);

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

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Reference: OpenWeatherAPI documentation
  // https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2
  const background = (condition_code) => {
    if (condition_code < 300) {
      return `url(${thunderstorm_img})`;
    } else if (condition_code < 600){
      return `url(${rain_img})`;
    } else if (condition_code < 700){
      return `url(${snow_img})`;
    } else if (condition_code == 800) {
      return `url(${sunny_img})`;
    } else if (800 < condition_code && condition_code < 900) {
      return `url(${cloudy_img})`;
    } else {
      return `url(${unknown_img})`;
    }
  }

  return (
    <>
      {isVarLoaded && results && (
        <div className="bigCard" style={{backgroundImage: background(results.weather[0].id)}}>
          <div align="left">
            <mainScreenTemp style={{color: 'White'}}>{city}</mainScreenTemp>
          </div>

          <div align="center">
            <mainScreenTemp style={{color: 'White'}}>{results.main.temp}°C</mainScreenTemp>
          </div>
          
            <div id="container">
              <div id="inner">
                <div class="child"><BigCardStatArea firstLine={"Chance of Rain"} secondLine={"XX%"}/></div>
                <div class="child"><BigCardStatArea firstLine={"Humidity"} secondLine={results.main.humidity+"%"}/></div>
                <div class="child"><BigCardStatArea firstLine={"Feel like"} secondLine={results.main.feels_like+"°C"}/></div>
                <div class="child"><BigCardStatArea firstLine={"Wind speed"} secondLine={results.wind.speed+"mph"}/></div>
              </div>
            </div>
        </div>
      )}
    </>
  );
}

export function BigCardStatArea({firstLine, secondLine}) {
  return (
    <>
    <div align="center">
      <smallTextBold style={{color: 'White'}}>{firstLine}</smallTextBold>
    </div>
    <div align="center">
      <smallText style={{color: 'White'}}>{secondLine}</smallText>
    </div>
  </>
  )
}