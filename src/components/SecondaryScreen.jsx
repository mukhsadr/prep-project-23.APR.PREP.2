import React, { useEffect } from "react";
import { useWeatherContext } from "../store/WeatherContext";
import { Grid } from "@mui/material";
import TopBar from "./TopBar";
import { Title } from "../TextStyle";
import back_button from "../components/BackButton.png"
import favorite from "../components/Favorite.png"
import favorite_hollow from "../components/Favorite_hollow.png"

function SecondaryScreen() {
  const { city, temp, unit, isLoaded, results, error, isVarLoaded, changeScreen, favCities, addFavorite, deleteFromFavorite, favoriteContain } =
    useWeatherContext();

  var fav_img = (favoriteContain(city)) ? favorite : favorite_hollow;

  const handleFavClick = () => {
    if (fav_img === favorite) {
      // remove
      fav_img = (deleteFromFavorite(city)) ? favorite_hollow : favorite;
    } else {
      // add
      fav_img = (addFavorite(city)) ? favorite : favorite_hollow;
    }
  }

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
        <TopBar></TopBar>
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
              <div style={{display:"flex", 
                flexDirection:"row", 
                alignItems: "center",
                flex: "none",
                order: 0,
                alignSelf: "stretch",
                flexGrow: 0}}>
                  <img src={back_button} alt="Back Button" onClick={changeScreen} />
                  <Title text={city} color='White'/>
                  <img src={fav_img} alt="Favorite Button" onClick={handleFavClick} />
              </div>

              <div>
                <Title text={city} color='White'/>
                <div className="Results" onClick={changeScreen}>
                  {!isVarLoaded && <h2>Loading...</h2>}
                  {console.log(results)}
                  {console.log(isLoaded)}
                  {isVarLoaded && results && (
                    <>
                      <h3>{results.weather[0].main}</h3>
                      {temp ? (
                        <p>
                          Feels like {temp.toFixed(2)}°{unit}
                        </p>
                      ) : null}
                      <i>
                        <p>
                          {results.name}, {results.sys.country}
                        </p>
                      </i>
                    </>
                  )}
                </div>
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
