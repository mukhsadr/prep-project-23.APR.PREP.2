import React from "react";
import { useState } from "react";
//import { useEffect } from "react";

export default function TempConvert(props, currTemp) {
  const [temp, setTemp] = useState(0);
  const [unit, setUnit] = useState("C");

  const oppositeUnit = unit === "C" ? "F" : "C";
 
  const convert = () => {
    if (unit === "C") {
      const newT = temp * 1.8 + 32;
      setTemp(Math.round(newT));
      setUnit("F");
    }

    if (unit === "F") {
      const newT = ((temp - 32) * 5) / 9;
      setTemp(Math.round(newT));
      setUnit("C");
    }
    props.tempHandler(temp, unit);
  };
  /*
  useEffect(() => {
    setTemp(temp);
  }, [temp]); */

  return (
    <div className="App">
      <button onClick={convert}>Convert to {oppositeUnit}</button>
    </div>
  );
}