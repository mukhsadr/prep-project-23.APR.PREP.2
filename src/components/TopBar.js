import React from "react";
import { useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import { useWeatherContext } from "../store/WeatherContext";
import AutoComp from "./AutoComp";
import TempConvert from "./TempConvert";
import Spotify from "./Spotify";

export default function TopBar() {
  const { isLoaded, cityHandler, city, temp, tempHandler } =
    useWeatherContext();

  return (
    <Grid
      xs={1}
      sx={{
        minWidth: "100%",
        maxWidth: "100%",
        alignContent: "flex-start",
      }}
    >
      <Grid container alignItems={"center"}>
        <Grid item xs={4} padding={"20px"}>
          <Typography
            variant={"h4"}
            align={"left"}
            sx={{
              display: {
                xs: "none",
                sm: "none",
                md: "block",
              },
            }}
          >
            MLH Weather
          </Typography>
          <Typography
            variant={"h6"}
            align={"left"}
            sx={{ display: { sm: "block", md: "none" } }}
          >
            MLH Weather
          </Typography>
        </Grid>
        <Grid container xs={8} direction={"row"} align={"right"}>
          <Grid item xs={3} padding={"30px"}>
            {temp ? (
              <TempConvert
                tempHandler={tempHandler}
                currTemp={temp}
              ></TempConvert>
            ) : null}
          </Grid>
          <Grid item xs={6} padding={"20px"}>
            {isLoaded && (
              <AutoComp cityHandler={cityHandler} city={city}></AutoComp>
            )}
          </Grid>
          <Spotify></Spotify>
        </Grid>
      </Grid>
    </Grid>
  );
}
