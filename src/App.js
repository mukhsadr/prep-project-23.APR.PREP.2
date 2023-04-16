import { useEffect, useState } from "react";
import "./App.css";
import logo from "./mlh-prep.png";
import AutoComp from "./components/AutoComp";
import { useLoadScript } from "@react-google-maps/api";
import React from 'react';
import './App.css';
import TempConvert from "./components/TempConvert";
import { useMediaQuery } from "@material-ui/core";


function App() {
  const [error, setError] = useState(null);
  const [isVarLoaded, setIsVarLoaded] = useState(false);
  const [city, setCity] = useState("Your location");
  const [temp, setTemp] = useState(null);
  const [unit, setUnit] = useState("C");
  const [results, setResults] = useState(null);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries: ["places"],
  });

  useEffect(() => {
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
          setCity(result[0].name);
        })
      }, (err) => {
        console.log("Error:")
        console.log(err)
      });
    }
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
            console.log("Result:", result)
          }
        },
        (error) => {
          setIsVarLoaded(true);
          setError(error);
        }
      );
  }, [city]);

  useEffect(() => {
    if (results !== null) {
      if (unit === "F") {
        let newT = results.main.feels_like * 1.8 + 32;
        setTemp(newT)

      } else {
        setTemp(results.main.feels_like)
      }
    }
  }, [results])




  const cityHandler = (city) => {
    console.log("City set to:", city);
    setCity(city);
  };

  const tempHandler = (temp, unit) => {
    console.log("Temp set to:", temp)
    setTemp(temp);
    setUnit(unit);
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <>
        <img className="logo" src={logo} alt="MLH Prep Logo"></img>
        <div>
          <h2>Enter a city below 👇</h2>
          {isLoaded && <AutoComp cityHandler={cityHandler} city={city}></AutoComp>}
          {temp ? <TempConvert tempHandler={tempHandler} currTemp={temp}></TempConvert> : null}
          <div className={`Results${" smallScreen"}`}>
            {!isVarLoaded && <h2>Loading...</h2>}
            {console.log(results)}
            {console.log(isLoaded)}
            {isVarLoaded && results && (
              <>
                <h3>{results.weather[0].main}</h3>
                {temp ? <p>Feels like {temp.toFixed(2)}°{unit}</p> : null}
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
