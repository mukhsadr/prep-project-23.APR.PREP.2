import { useEffect, useState } from "react";

import "./../App.css";
import "../TextStyle"
import logo from "./../mlh-prep.png";
import AutoComp from "./AutoComp";
import React from "react";
import TempConvert from "./TempConvert";
import { useWeatherContext } from "../store/WeatherContext";
import TopBar from "./TopBar";
import { Grid } from "@mui/material";

import sunny_img from "../weatherImage/sunny.png";
import snow_img from "../weatherImage/snow.png"
import rain_img from "../weatherImage/Rain.png";
import thunderstorm_img from "../weatherImage/Thunderstorm.png";
import cloudy_img from "../weatherImage/Cloudy.webp"
import unknown_img from "../weatherImage/unknown.jpeg"
import { MainScreenTemp, SmallText, SmallTextBold } from "../TextStyle";

function InitialScreen() {
  const { yourLocation, temp, unit, isLoaded, results, error, isVarLoaded, changeScreen } =
    useWeatherContext();

  useEffect(() => {
    const user = window.localStorage.getItem('MLH_Weather_User');
  })

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <Grid item maxHeight="15%">
          <TopBar></TopBar>
          </Grid>
          <Grid item maxHeight="100px">
            <titleSelfDefined>Your current location weather: </titleSelfDefined>
          </Grid>

          <Grid item maxHeight="500px">
            <div align="center"><BigCard city={yourLocation}/></div>
          </Grid>

          <Grid item maxHeight="500px">
            <titleSelfDefined>Good morning Grace.</titleSelfDefined> <br></br>
            <titleSelfDefined>Here's your favorite cities' weather now:</titleSelfDefined>
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
      </Grid>
    );
  }
}

export default InitialScreen;

export function InitialScreenUserSection({user}) {
  if (user === null) {
    return (<>
      <titleSelfDefined>Hi there!</titleSelfDefined> <br></br>
      <titleSelfDefined>You have no favorite city. </titleSelfDefined>
    </>)
  }
}

export function BigCard({city}) {
  const [error, setError] = useState(null);
  const [isVarLoaded, setIsVarLoaded] = useState(false);
  const [results, setResults] = useState(null);
  
  const {setCity, changeScreen, unit} = useWeatherContext();

  var api_url = "https://api.openweathermap.org/data/2.5/weather?q=" + city

  if (unit === "C") {
    api_url += "&units=metric"
  } else {
    api_url += "&units=imperial"
  }

  api_url += "&appid=" + process.env.REACT_APP_APIKEY

  useEffect(() => {
    console.log('Unit Has changed:', unit)
    fetch(api_url)
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
  }, [city, unit]);

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

  const speed = (unit === "C") ? "kph" : "mph";

  const handleClick = () => {
    setCity(city);
    changeScreen();
  }

  return (
    <>
      {isVarLoaded && results && (
        <div className="BigCard" onClick={handleClick} style={{backgroundImage: background(results.weather[0].id)}}>
          <div align="left">
            <MainScreenTemp text={city} color = 'White' />
          </div>

          <div align="center">
            <MainScreenTemp text={results.main.temp + "°" + unit} color = 'White' />
          </div>
          
            <div id="container">
              <div id="inner">
                <div class="child"><BigCardStatArea firstLine={"Chance of Rain"} secondLine={"XX%"}/></div>
                <div class="child"><BigCardStatArea firstLine={"Humidity"} secondLine={results.main.humidity+"%"}/></div>
                <div class="child"><BigCardStatArea firstLine={"Feel like"} secondLine={results.main.feels_like+"°"+unit}/></div>
                <div class="child"><BigCardStatArea firstLine={"Wind speed"} secondLine={results.wind.speed+speed}/></div>
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
      <SmallTextBold text={firstLine} color='white'/>
    </div>
    <div align="center">
      <SmallText text={secondLine} color='white'/>
    </div>
  </>
  )
}