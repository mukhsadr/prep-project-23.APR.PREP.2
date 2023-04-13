import { useEffect, useState } from "react";
import logo from "./../mlh-prep.png";
import AutoComp from "./AutoComp";
import { useLoadScript } from "@react-google-maps/api";
import { useWeatherContext } from "../store/WeatherContext";
import { Box, Grid } from "@mui/material";

function SecondaryScreen() {
  const [error, setError] = useState(null);
  const [isVarLoaded, setIsVarLoaded] = useState(false);
  const [city, setCity] = useState("New York City");
  const [results, setResults] = useState(null);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries: ["places"],
  });
  const { screen, setScreen } = useWeatherContext();

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

  const changeScreen = () => {
    setScreen((prev) => !prev);
    console.log("Second:", screen);
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <Grid
        container
        wrap="nowrap"
        direction={"column"}
        sx={{
          height: "100%",
          width: "100%",
          overflowY: "scroll",
        }}
      >
        <Grid
          xs={1}
          sx={{
            border: "solid",
            borderColor: "white",
            minWidth: "100%",
            maxWidth: "100%",
            alignContent: "flex-start",
          }}
        >
          <img className="logo" src={logo} alt="MLH Prep Logo"></img>
          Header
        </Grid>
        <Grid
          xs={7}
          sx={{
            border: "solid",
            borderColor: "white",
            minWidth: "100%",
            maxWidth: "100%",
          }}
        >
          {" "}
          <Grid container direction={"row"} className={"LeftSide"}>
            <Grid
              sm={12}
              md={6}
              sx={{
                border: "solid",
                borderColor: "white",
                height: "100%",
              }}
            >
              <h2>Secondary Screen👇</h2>
              {isLoaded && <AutoComp cityHandler={cityHandler}></AutoComp>}
              <div className="Results" onClick={changeScreen}>
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
            </Grid>
            <Grid
              container
              direction={"column"}
              sm={12}
              md={6}
              sx={{
                border: "solid",
                borderColor: "white",
                height: "100%",
                display: { xs: "none", sm: "none", md: "grid" },
              }}
            >
              <Grid
                xs={6}
                sx={{
                  border: "solid",
                  borderColor: "white",
                  height: "100%",
                  maxWidth: "100%",
                  minWidth: "100%",
                }}
              >
                top right
              </Grid>
              <Grid
                xs={6}
                sx={{
                  border: "solid",
                  borderColor: "white",
                  height: "100%",
                  maxWidth: "100%",
                  minWidth: "100%",
                }}
              >
                bottom right
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          xs={3}
          sx={{
            border: "solid",
            borderColor: "white",
            minWidth: "100%",
            maxWidth: "100%",
          }}
        >
          Bottom part
        </Grid>
      </Grid>
    );
  }
}

export default SecondaryScreen;
