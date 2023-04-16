import React, { useEffect, useState } from "react";
import { Button, Grid } from "@mui/material";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";

export default function Spotify() {
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const CLIENT_SECRET = process.env.REACT_APP_SPOTIFY_CLIENT_KEY;
  const REDIRECT_URI = "http://localhost:3000";
  const RESPONSE_TYPE = "token";

  const [token, setToken] = useState("");
  const [musicPlaying, setMusicPlaying] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");
    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);

      console.log(token);
    }
    setToken(token);
  }, []);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  return (
    <Grid xs={3}>
      {!token ? (
        <Grid
          item
          padding={"20px"}
          sx={{ display: { xs: "none", sm: "none", md: "block" } }}
        >
          {" "}
          <div className="tooltip">
            <a
              href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
            >
              {
                <img
                  height={"27px"}
                  src={process.env.PUBLIC_URL + "./pngegg.png"}
                />
              }
            </a>{" "}
            <span className="tooltiptext">Login</span>
          </div>
        </Grid>
      ) : (
        <Grid
          item
          padding={"20px"}
          sx={{ display: { xs: "none", sm: "none", md: "block" } }}
        >
          {musicPlaying ? (
            <Button width={"30px"}>
              <PauseIcon sx={{ color: "rgb(191,178,232)" }}></PauseIcon>
            </Button>
          ) : (
            <Button width={"30px"}>
              <PlayArrowIcon sx={{ color: "rgb(191,178,232)" }}></PlayArrowIcon>
            </Button>
          )}
          <Button minwidth={"30px"} maxwidth={"30px"}>
            <SkipNextIcon
              sx={{
                color: "rgb(191,178,232)",
              }}
            ></SkipNextIcon>
          </Button>
          <div className="tooltip">
            <Button onClick={logout}>
              <img
                height={"27px"}
                src={process.env.PUBLIC_URL + "./pngegg.png"}
              />
            </Button>
            <span className="tooltiptext">Logout</span>
          </div>
        </Grid>
      )}
    </Grid>
  );
}
