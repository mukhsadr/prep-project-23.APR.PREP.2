import "./App.css";
import { useWeatherContext } from "./store/WeatherContext";
import InitialScreen from "./components/InitialScreen";
import SecondaryScreen from "./components/SecondaryScreen";
import { useEffect } from "react";

function App() {
  const { screen, favCities, setFavCities } = useWeatherContext();

  useEffect(() => {
    if (favCities === null) {
      const storedCities = window.localStorage.getItem("MLH_FAV_CITIES");
      if (storedCities) {
        setFavCities(JSON.parse(storedCities));
      }
    }
  });

  return <>{!screen ? <InitialScreen /> : <SecondaryScreen />}</>;
}

export default App;
