import React, { useEffect, useState } from "react";
import { useWeatherContext } from "../store/WeatherContext";
import { Button, Grid } from "@mui/material";
import TopBar from "./TopBar";
import { Title } from "../TextStyle";
import back_button from "../components/BackButton.png";
import favorite from "../components/Favorite.png";
import favorite_hollow from "../components/Favorite_hollow.png";
import AirQuality1 from "./AirQuality/AirQuality";
import AirQuality from "./AirQuality";
import { Modal } from "react-bootstrap";
import Map from "./Map/Map";
// import SongRecommendation from "./SongRecommendation/SongRecommendation";
import { requiredThings } from "./../assets/constants";
import EquipmentTable from "./EquipmentTable";
import EquipmentCard from "./EquipmentCard";
import Forecast from "./Forecast/Forecast";
import WeeklyForecast from "./WeeklyForecast/WeeklyForecast";

function SecondaryScreen() {
  const {
    city,
    setCity,
    temp,
    unit,
    isLoaded,
    results,
    error,
    isVarLoaded,
    changeScreen,
    favCities,
    addFavorite,
    deleteFromFavorite,
    favoriteContain,
    location,
    weeklyForecast
  } = useWeatherContext();
  const [showModal, setShowModal] = useState(false);

  let fav_img = favoriteContain(city) ? favorite : favorite_hollow;

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleFavClick = () => {
    if (fav_img === favorite) {
      // remove
      fav_img = deleteFromFavorite(city) ? favorite_hollow : favorite;
    } else {
      // add
      fav_img = addFavorite(city) ? favorite : favorite_hollow;
    }
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
        <TopBar></TopBar>
        <Grid
          xs={7}
          sx={{
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
                height: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  flex: "none",
                  order: 0,
                  alignSelf: "stretch",
                  flexGrow: 0,
                }}
              >
                <img
                  src={back_button}
                  alt="Back Button"
                  onClick={changeScreen}
                />
                <Title text={city} color="White" />
                <img
                  src={fav_img}
                  alt="Favorite Button"
                  onClick={handleFavClick}
                />
              </div>

              <div>{isVarLoaded && results && <Forecast city={city} />}</div>
              <div>{isVarLoaded && results && <WeeklyForecast weeklyForecast={weeklyForecast} />}</div>
            </Grid>
            <Grid
              container
              direction={"column"}
              sm={12}
              md={6}
              sx={{
                height: "100%",
                display: { xs: "none", sm: "none", md: "grid" },
              }}
            >
              <Grid
                xs={6}
                sx={{
                  height: "100%",
                  maxWidth: "100%",
                  minWidth: "100%",
                  paddingTop: "15%",
                }}
              >
                {location.lat && location.lng && (
                  <div>
                    <Map />
                  </div>
                )}
              </Grid>
              <Grid
                xs={6}
                container
                sx={{
                  height: "100%",
                  maxWidth: "100%",
                  minWidth: "100%",
                }}
              >
                {" "}
                <Grid xs={6}>
                  <h4>Things to bring:</h4>
                  {!!results.weather && !!results.weather[0].main && (
                    <EquipmentTable
                      equipments={requiredThings[results.weather[0].main]}
                    />
                  )}
                </Grid>
                <Grid xs={6} padding={"10%"}>
                  <AirQuality city={city}></AirQuality>
                  <div className="aq-container">
                    <AirQuality1 city={city} />
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          xs={3}
          sx={{
            minWidth: "100%",
            maxWidth: "100%",
          }}
        >
          {/* <div>{results && <SongRecommendation options={results} />}</div> */}
          Bottom part
        </Grid>
      </Grid>
    );
  }
}

export default SecondaryScreen;
