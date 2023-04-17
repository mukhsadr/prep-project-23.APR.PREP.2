import * as React from "react";
import WeatherStore from "./WeatherContext";
import SpotifyStore from "./SpotifyContext";

const GlobalStore = ({ children }) => {
  return (
    <SpotifyStore>
      <WeatherStore>{children}</WeatherStore>
    </SpotifyStore>
  );
};

export default GlobalStore;
