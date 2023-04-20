import React, { useEffect, useState } from "react";
import { useWeatherContext } from "../store/WeatherContext";
import { Button, Grid } from "@mui/material";
import TopBar from "./TopBar";
import {
  MainScreenCondition,
  MainScreenTemp,
  SmallText,
  SmallTextBold,
  Title,
} from "../TextStyle";
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
    weeklyForecast,
    screenWidth,
    setScreenWidth,
    screenHeight,
    setScreenHeight,
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

  const leftSectionCardStyle = {
    minHeight: "60vh",
    WebkitBackdropFilter: "blur(5px)",
    backdropFilter: "blur(5px)",
    borderRadius: "8px",
    boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
    backgroundColor: "rgba(229, 195, 195, 0.25)",
  };

  const rightSectionCardStyle = {
    maxHeight: "250px",
    WebkitBackdropFilter: "blur(5px)",
    backdropFilter: "blur(5px)",
    borderRadius: "8px",
    boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
    backgroundColor: "rgba(229, 195, 195, 0.25)",
    padding: "20px",
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <div>
        <TopBar></TopBar>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            padding: "0px 20px 0px",
          }}
        >
          {/* function area */}

          <div style={{ width: screenWidth * 0.5 }}>
            {/* Left side */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                padding: "0px 10px 0px",
              }}
            >
              <img
                src={back_button}
                alt="Back Button"
                onClick={changeScreen}
                height={30}
                width={30}
              />
              <MainScreenTemp text={city} color="White" />
              <MainScreenTemp
                text={temp.toFixed(2) + "°" + unit}
                color="White"
              />
              <MainScreenTemp text={results.weather[0].main} color="White" />
              <img
                src={fav_img}
                alt="Favorite Button"
                onClick={handleFavClick}
                height={30}
                width={30}
              />
            </div>
            <div style={{ width: "100%" }}>
              <div style={leftSectionCardStyle}>
                {isVarLoaded && results && <Forecast city={city} />}
              </div>
            </div>
          </div>

          <div style={{ width: screenWidth * 0.5, padding: "10px" }}>
            {/* right side */}
            {location.lat && location.lng && <Map city={city}/>}

            <div style={{ height: "10px" }}></div>

            <div
              style={{
                display: "flex",
                flex_direction: "row",
                justify_content: "space-between",
                align_items: "flex-start",
                padding: "10px",
                gap: "10px",
                /* Inside auto layout */
                order: 1,
                align_self: "stretch",
                flex_grow: 1,
              }}
            >
              {/* Reminder and airquality area */}

              <div style={{ width: "50%" }}>
                <div style={rightSectionCardStyle}>
                  {/* Reminder area */}
                  <SmallText text={"Things to brings:"} />
                  <div
                    style={{
                      overflowX: "auto",
                      display: "flex",
                      whiteSpace: "nowrap",
                      height: "200px",
                    }}
                  >
                    {!!results.weather && !!results.weather[0].main && (
                      <EquipmentTable
                        equipments={requiredThings[results.weather[0].main]}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div style={{ width: "50%" }}>
                <div style={rightSectionCardStyle}>
                  {/* Area Quality area */}
                  <div className="aq-container">
                    <AirQuality1 city={city} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          {/* Button part */}
          <div>
            {isVarLoaded && results && (
              <WeeklyForecast weeklyForecast={weeklyForecast} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default SecondaryScreen;
