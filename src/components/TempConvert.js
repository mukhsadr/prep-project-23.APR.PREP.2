import React from "react";
import { useState } from "react";
import {FormControlLabel, Switch} from "@mui/material";


export default function TempConvert(props) {
  const [temp, setTemp] = useState(props.currTemp);
  const [unit, setUnit] = useState("C");
  const [label, setLabel] = useState("Convert to °F")
  
  const convert = () => {
    console.log(props.currTemp)
    let newT = 0
    setTemp(props.currTemp)
    if (unit === "C") {
      newT = props.currTemp * 1.8 + 32;
      setTemp(Math.round(newT));
      setUnit("F");
      setLabel("Convert to °C")
    } else if (unit === "F") {
      newT = ((props.currTemp - 32) * 5) / 9;
      setTemp(Math.round(newT));
      setUnit("C");
      setLabel("Convert to °F")
    }
    props.tempHandler(newT, unit);
  };

  return (
      <FormControlLabel control={<Switch  onClick={convert} defaultChecked color="warning" />} label={label}/>
  );
}