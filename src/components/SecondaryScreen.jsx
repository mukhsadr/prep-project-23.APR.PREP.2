import React, { useEffect, useState } from "react";
import { useWeatherContext } from "../store/WeatherContext";
import { Button, Grid } from "@mui/material";
import TopBar from "./TopBar";
import { SmallText, Title } from "../TextStyle";
import back_button from "../components/BackButton.png";
import favorite from "../components/Favorite.png";
import favorite_hollow from "../components/Favorite_hollow.png";
import AirQuality1 from "./AirQuality/AirQuality";
import AirQuality from "./AirQuality";
import { Modal } from "react-bootstrap";
import Map from "./Map/Map";
import SongRecommendation from "./SongRecommendation/SongRecommendation";
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
    setScreenHeight
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
    WebkitBackdropFilter: 'blur(5px)', 
    backdropFilter: 'blur(5px)',
    borderRadius: "8px",
    boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
    backgroundColor: 'rgba(229, 195, 195, 0.25)'
  };

  const rightSectionCardStyle = {
    maxHeight: "260px",
    WebkitBackdropFilter: 'blur(5px)', 
    backdropFilter: 'blur(5px)',
    borderRadius: "8px",
    boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
    backgroundColor: 'rgba(229, 195, 195, 0.25)',
    padding: "20px"
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <div>
        <TopBar></TopBar>

        <div style={{ display: 'flex', flexDirection: 'row', padding: "0px 20px 0px"}}>
          {/* function area */}

          <div style={{ width: screenWidth*0.5}}>
            {/* Left side */}
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: "0px 10px 0px"}}>
              <img
                src={back_button}
                alt="Back Button"
                onClick={changeScreen}
                height={30}
                width={30}
              />
              <Title text={city} color="White" />
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
                {isVarLoaded && results && <Forecast city={city}/>}
              </div>
            </div>
          </div>

          <div style={{ width: screenWidth*0.5, padding: "10px"}}>
            {/* right side */}
            {location.lat && location.lng && (
              <Map />
            )}

            <div style={{ height: '10px' }}></div>

            <div style={{ display: "flex",
                flex_direction: "row",
                justify_content: "space-between",
                align_items: "flex-start",
                padding: "10px",
                gap: "10px",
                /* Inside auto layout */
                order: 1,
                align_self: "stretch",
                flex_grow: 1
                }}>
              {/* Reminder and airquality area */}

              <div style={{ width: "50%" }}>
                <div style={rightSectionCardStyle}>
                  {/* Reminder area */}
                  <SmallText text={"Things to brings:"}/>
                  {!!results.weather && !!results.weather[0].main && (
                    <EquipmentTable
                      equipments={requiredThings[results.weather[0].main]}
                    />
                  )}
                </div>
              </div>

              <div style={{ width: "50%", height: "200px"}}>
                <div style={rightSectionCardStyle}>
                  {/* Area Quality area */}
                  <AirQuality city={city}></AirQuality>
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
            <div>{isVarLoaded && results &&<WeeklyForecast weeklyForecast = {weeklyForecast}/>}</div>
        </div>
      </div>
      // <Grid
      //   container
      //   wrap="nowrap"
      //   direction={"column"}
      //   sx={{
      //     height: "100%",
      //     width: "100%",
      //     overflowY: "scroll",
      //   }}
      // >
      //   <TopBar></TopBar>
      //   <Grid
      //     xs={7}
      //     sx={{
      //       minWidth: "100%",
      //       maxWidth: "100%",
      //     }}
      //   >
      //     {" "}
      //     <Grid container direction={"row"} className={"LeftSide"}>
      //       <Grid
      //         sm={12}
      //         md={6}
      //         sx={{
      //           height: "100%",
      //         }}
      //       >
      //         <div
      //           style={{
      //             display: "flex",
      //             flexDirection: "row",
      //             alignItems: "center",
      //             flex: "none",
      //             order: 0,
      //             alignSelf: "stretch",
      //             flexGrow: 0,
      //           }}
      //         >
      //           <img
      //             src={back_button}
      //             alt="Back Button"
      //             onClick={changeScreen}
      //           />
      //           <Title text={city} color="White" />
      //           <img
      //             src={fav_img}
      //             alt="Favorite Button"
      //             onClick={handleFavClick}
      //           />
      //         </div>

      //         <div>{isVarLoaded && results && <Forecast city={city}/>}</div>
              
      //       </Grid>
      //       <Grid
      //         container
      //         direction={"column"}
      //         sm={12}
      //         md={6}
      //         sx={{
      //           height: "100%",
      //           display: { xs: "none", sm: "none", md: "grid" },
      //         }}
      //       >
      //         <Grid
      //           xs={6}
      //           sx={{
      //             height: "100%",
      //             maxWidth: "100%",
      //             minWidth: "100%",
      //             paddingTop: "15%",
      //           }}
      //         >
      //           {location.lat && location.lng && (
      //             <div>
      //               <Map />
      //             </div>
      //           )}
      //         </Grid>
      //         <Grid
      //           xs={6}
      //           container
      //           sx={{
      //             height: "100%",
      //             maxWidth: "100%",
      //             minWidth: "100%",
      //           }}
      //         >
      //           {" "}
      //           <Grid xs={6}>
      //             <h4>Things to bring:</h4>
      //             {!!results.weather && !!results.weather[0].main && (
      //               <EquipmentTable
      //                 equipments={requiredThings[results.weather[0].main]}
      //               />
      //             )}
      //           </Grid>
      //           <Grid xs={6} padding={"10%"}>
      //             <AirQuality city={city}></AirQuality>
      //             <div className="aq-container">
      //                 <AirQuality1 city={city} />
      //             </div>
      //           </Grid>
      //         </Grid>
      //       </Grid>
      //     </Grid>
      //   </Grid>
      //   <Grid
      //     xs={3}
      //     sx={{
      //       minWidth: "100%",
      //       maxWidth: "100%",
      //     }}
      //   >
      //     <div>{isVarLoaded && results &&<WeeklyForecast weeklyForecast = {weeklyForecast}/>}</div>
      //     <div>{results && <SongRecommendation options={results} />}</div>
      //     Bottom part
      //   </Grid>
      // </Grid>
    );
  }
}

export default SecondaryScreen;
