import { useEffect, useState } from "react";
import "./App.css";
import logo from "./mlh-prep.png";
import AutoComp from "./components/AutoComp";
import usePlacesAutocomplete from "use-places-autocomplete";
import { useLoadScript } from "@react-google-maps/api";
import './App.css';
import TempConvert from "./components/TempConvert";

function App() {
  const [error, setError] = useState(null);
  const [isVarLoaded, setIsVarLoaded] = useState(false);
  const [city, setCity] = useState("New York City");
  const [temp, setTemp] = useState(null);
  const [unit, setUnit] = useState("C");
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
            console.log("Result:",result)
          }
        },
        (error) => {
          setIsVarLoaded(true);
          setError(error);
        }
      ).then(()=> {
        setTemp(results.main.feels_like)
        setUnit("C")
        console.log(temp)
    });
  }, [city]);

  useEffect(()=> {
    results ? setTemp(results.main.feels_like) : setTemp(null)
  }, [results])




  const cityHandler = (city) => {
    console.log("City set to:", city);
    setCity(city);
  };

  const tempHandler = (temp, unit) => {
    console.log("Temp set to:", temp)
    setTemp(temp);
    setUnit(unit);
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
          {temp ? <TempConvert tempHandler={tempHandler} currTemp={temp}></TempConvert> : null}
          <div className="Results">
            {!isVarLoaded && <h2>Loading...</h2>}
            {console.log(results)}
            {console.log(isLoaded)}
            {isVarLoaded && results && (
              <>
                <h3>{results.weather[0].main}</h3>
                {temp ? <p>Feels like {temp.toFixed(2)}°{unit}</p> : null}
                <i>
                  <p>
                    {results.name}, {results.sys.country}
                  </p>
                </i>
              </>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default App;
