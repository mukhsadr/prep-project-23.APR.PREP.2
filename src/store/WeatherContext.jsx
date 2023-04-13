import * as React from "react";
import { createContext, useContext, useEffect, useState } from "react";

const WeatherContext = createContext(undefined);

export const useWeatherContext = () => {
  const weatherContext = useContext(WeatherContext);
  if (weatherContext === undefined) {
    throw new Error("useWeatherContext must be called inside a GlobalStore");
  }
  return weatherContext;
};

const WeatherStore = ({ children }) => {
  const [screen, setScreen] = useState(false);

  const weatherStoreValues = {
    screen,
    setScreen,
  };

  useEffect(() => {
    console.log("screen changing");
  }, [screen]);

  return (
    <WeatherContext.Provider value={weatherStoreValues}>
      {children}
    </WeatherContext.Provider>
  );
};
export default WeatherStore;
