import React, { useEffect, useState } from "react";
import { Button, Grid } from "@mui/material";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import axios from "axios";

const track = {
  name: "",
  album: {
    images: [{ url: "" }],
  },
  artists: [{ name: "" }],
};
export default function MusicPlayer() {
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const CLIENT_SECRET = process.env.REACT_APP_SPOTIFY_CLIENT_KEY;
  const REDIRECT_URI = "http://localhost:3000";
  const RESPONSE_TYPE = "token";
  const scope =
    "streaming \
    user-read-email \
    user-read-private   \
    user-read-currently-playing\
    user-read-recently-played \
    user-read-playback-state\
    user-top-read\
    user-modify-playback-state";

  const [token, setToken] = useState("");
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [player, setPlayer] = useState(undefined);
  const [music, setMusic] = useState(new Audio());
  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [current_track, setTrack] = useState(track);

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

  function playMusic(url) {
    player.togglePlay();
  }

  useEffect(() => {
    if (token !== "") {
      const script = document.createElement("script");
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;

      document.body.appendChild(script);
      window.onSpotifyWebPlaybackSDKReady = () => {
        // Define the Spotify Connect device, getOAuthToken has an actual token
        // hardcoded for the sake of simplicity
        let player = new window.Spotify.Player({
          name: "A Spotify Web SDK Player",
          getOAuthToken: (callback) => {
            callback(token);
          },
          volume: 0.1,
        });

        // Called when connected to the player created beforehand successfully
        player.addListener("ready", ({ device_id }) => {
          console.log("Ready with Device ID", device_id);

          const play = ({
            spotify_uri,
            playerInstance: {
              _options: { getOAuthToken, id },
            },
          }) => {
            getOAuthToken((access_token) => {
              fetch(
                `https://api.spotify.com/v1/me/player/play?device_id=${device_id}`,
                {
                  method: "PUT",
                  body: JSON.stringify({ uris: [spotify_uri] }),
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${access_token}`,
                  },
                }
              );
            });
          };

          play({
            playerInstance: player,
            spotify_uri: "spotify:track:3sg1RZE32Qwy8j1T1POnBx",
          });
        });

        player.connect();
        setPlayer(player);
      };
    }
  }, [token]);

  const fetchMusic = () =>
    axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: "Miley",
        type: "artist",
      },
    });
  const findMusic = async () => {
    await fetchMusic()
      .then((received) => {
        console.log("here", received.data);
        setMusicPlaying((prev) => !prev);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const pauseMusic = () => {
    setMusicPlaying((prev) => !prev);
    player.togglePlay();
    player.getCurrentState().then((state) => {
      if (!state) {
        console.error("User is not playing music through the Web Playback SDK");
        return;
      }

      console.log("State", state);
    });
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
              href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${scope}`}
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
              <PauseIcon
                onClick={pauseMusic}
                sx={{ color: "rgb(191,178,232)" }}
              ></PauseIcon>
            </Button>
          ) : (
            <Button width={"30px"}>
              <PlayArrowIcon
                onClick={findMusic}
                sx={{ color: "rgb(191,178,232)" }}
              ></PlayArrowIcon>
            </Button>
          )}
          <Button
            minwidth={"30px"}
            maxwidth={"30px"}
            onClick={() => {
              player.nextTrack();
            }}
          >
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
