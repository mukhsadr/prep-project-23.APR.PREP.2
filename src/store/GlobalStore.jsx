import * as React from "react";
import WeatherStore from "./WeatherContext";

const GlobalStore = ({ children }) => {
  return <WeatherStore>{children}</WeatherStore>;
};

export default GlobalStore;
