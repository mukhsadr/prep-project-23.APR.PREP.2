import "./App.css";
import { useWeatherContext } from "./store/WeatherContext";
import InitialScreen from "./components/InitialScreen";
import SecondaryScreen from "./components/SecondaryScreen";

function App() {
  const { screen } = useWeatherContext();

  return <>{!screen ? <InitialScreen /> : <SecondaryScreen />}</>;
}

export default App;
