import React from "react";
import { useState } from "react";
import { FormControlLabel, Switch } from "@mui/material";
import { useWeatherContext } from "../store/WeatherContext";

export default function TempConvert(props) {
  const { unit, setUnit } = useWeatherContext();
  const [label, setLabel] = useState("Convert to °F");

  const convert = () => {
    console.log(props.currTemp);
    let newT = 0;
    let newUnit = "C";
    if (unit === "C") {
      newT = props.currTemp * 1.8 + 32;
      newUnit = "F";
      setUnit("F");
      setLabel("Convert to °C");
    } else if (unit === "F") {
      newT = ((props.currTemp - 32) * 5) / 9;
      newUnit = "C";
      setUnit("C");
      setLabel("Convert to °F");
    }
    props.tempHandler(newT, newUnit);
  };

  return (
    <FormControlLabel
      control={<Switch onClick={convert} defaultChecked color="warning" />}
      label={label}
    />
  );
}
