import { useEffect, useState } from "react";
import "./App.css";
import logo from "./mlh-prep.png";
import sunny_img from "./sunny.png";
import snow_img from "./snow.png"
import rain_img from "./Rain.png";
import thunderstorm_img from "./Thunderstorm.png";
import cloudy_img from "./Cloudy.webp"
import unknown_img from "./unknown.jpg"
import AutoComp from "./components/AutoComp";
import usePlacesAutocomplete from "use-places-autocomplete";
import { useLoadScript } from "@react-google-maps/api";

function App() {
  const [error, setError] = useState(null);
  const [isVarLoaded, setIsVarLoaded] = useState(false);
  const [city, setCity] = useState("New York City");
  const [results, setResults] = useState(null);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries: ["places"],
  });

  useEffect(() => {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric" +
        "&appid=" +
        process.env.REACT_APP_APIKEY
    )
      .then((res) => res.json())
      .then(
        (result) => {
          if (result["cod"] !== 200) {
            setIsVarLoaded(false);
          } else {
            setIsVarLoaded(true);
            setResults(result);
          }
        },
        (error) => {
          setIsVarLoaded(true);
          setError(error);
        }
      );
  }, [city]);

  const cityHandler = (city) => {
    console.log("City set to:", city);
    setCity(city);
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {

    return (
      <>
        <img className="logo" src={logo} alt="MLH Prep Logo"></img>
        <div>
          <h2>Enter a city below 👇</h2>
          {isLoaded && <AutoComp cityHandler={cityHandler}></AutoComp>}
          <div className="Results">
            {!isVarLoaded && <h2>Loading...</h2>}
            {console.log(results)}
            {console.log(isLoaded)}
            {isVarLoaded && results && (
              <>
                <h3>{results.weather[0].main}</h3>
                <p>Feels like {results.main.feels_like}°C</p>
                <i>
                  <p>
                    {results.name}, {results.sys.country}
                  </p>
                </i>
              </>
            )}
          </div>
          <div style={{ 
              width: '100%',
              height: '500px',
              overflowX: 'auto',
              whiteSpace: 'nowrap',
              }}>
            <div style={{ display: 'inline-block', padding: '10px' }}><BigCard city={city}/></div>
            <div style={{ display: 'inline-block', padding: '10px' }}><BigCard city={city}/></div>
            <div style={{ display: 'inline-block', padding: '10px' }}><BigCard city={city}/></div>
            <div style={{ display: 'inline-block', padding: '10px' }}><BigCard city={city}/></div>
            <div style={{ display: 'inline-block', padding: '10px' }}><BigCard city={city}/></div>
            <div style={{ display: 'inline-block', padding: '10px' }}><BigCard city={city}/></div>
          </div>
        </div>
      </>
    );
  }
}

export default App;

// default keyword: this is the main function
export function BigCard({city}) {
  const [error, setError] = useState(null);
  const [isVarLoaded, setIsVarLoaded] = useState(false);
  const [results, setResults] = useState(null);

  useEffect(() => {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric" +
        "&appid=" +
        process.env.REACT_APP_APIKEY
    )
      .then((res) => res.json())
      .then(
        (result) => {
          if (result["cod"] !== 200) {
            setIsVarLoaded(false);
          } else {
            setIsVarLoaded(true);
            setResults(result);
          }
        },
        (error) => {
          setIsVarLoaded(true);
          setError(error);
        }
      );
  }, [city]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Reference: OpenWeatherAPI documentation
  // https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2
  const background = (condition_code) => {
    if (condition_code < 300) {
      return `url(${thunderstorm_img})`;
    } else if (condition_code < 600){
      return `url(${rain_img})`;
    } else if (condition_code < 700){
      return `url(${snow_img})`;
    } else if (condition_code == 800) {
      return `url(${sunny_img})`;
    } else if (800 < condition_code && condition_code < 900) {
      return `url(${cloudy_img})`;
    } else {
      return `url(${unknown_img})`;
    }
  }

  return (
    <>
      {isVarLoaded && results && (
        <div className="bigCard" style={{backgroundImage: background(results.weather[0].id)}}>
          <div align="left">
            <mainScreenTemp>{city}</mainScreenTemp>
          </div>

          <div align="center">
            <mainScreenTemp>{results.main.temp}°C</mainScreenTemp>
          </div>
          
            <div id="container">
              <div id="inner">
                <div class="child"><BigCardStatArea firstLine={"Chance of Rain"} secondLine={"XX%"}/></div>
                <div class="child"><BigCardStatArea firstLine={"Humidity"} secondLine={results.main.humidity+"%"}/></div>
                <div class="child"><BigCardStatArea firstLine={"Feel like"} secondLine={results.main.feels_like+"°C"}/></div>
                <div class="child"><BigCardStatArea firstLine={"Wind speed"} secondLine={results.wind.speed+"mph"}/></div>
              </div>
            </div>
        </div>
      )}
    </>
  );
}

export function BigCardStatArea({firstLine, secondLine}) {
  return (
    <>
    <div align="center">
      <smallTextBold>{firstLine}</smallTextBold>
    </div>
    <div align="center">
      <smallText>{secondLine}</smallText>
    </div>
  </>
  )
}