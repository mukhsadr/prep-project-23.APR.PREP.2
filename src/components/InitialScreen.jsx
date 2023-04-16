import "./../App.css";
import logo from "./../mlh-prep.png";
import AutoComp from "./AutoComp";
import React from "react";
import TempConvert from "./TempConvert";
import { useWeatherContext } from "../store/WeatherContext";
import TopBar from "./TopBar";
import { Grid } from "@mui/material";

function InitialScreen() {
  const {
    city,
    temp,
    unit,
    isLoaded,
    results,
    error,
    isVarLoaded,
    cityHandler,
    tempHandler,
    changeScreen,
  } = useWeatherContext();

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <Grid container direction={"column"}>
        <TopBar></TopBar>
        <Grid xs={10} maxWidth={"100%"} minWidth={"100%"}>
          <div className="Results" onClick={changeScreen}>
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
        </Grid>
      </Grid>
    );
  }
}

export default InitialScreen;
