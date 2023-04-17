import * as React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { useLoadScript } from "@react-google-maps/api";

const SpotifyContext = createContext(undefined);

export const useSpotifyContext = () => {
  const spotifyContext = useContext(SpotifyContext);
  if (spotifyContext === undefined) {
    throw new Error("useWeatherContext must be called inside a GlobalStore");
  }
  return spotifyContext;
};

const track = {
  name: "",
  album: {
    images: [{ url: "" }],
  },
  artists: [{ name: "" }],
};

const SpotifyStore = ({ children }) => {
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
    player.disconnect();
    setPlayer(undefined);
    window.localStorage.removeItem("token");
  };

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

          player.addListener("player_state_changed", (state) => {
            if (!state) {
              return;
            }
            setTrack(state.track_window.current_track);
            setPaused(state.paused);

            player.getCurrentState().then((state) => {
              !state ? setActive(false) : setActive(true);
            });
          });

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

  const spotifyStoreValues = {
    token,
    setToken,
    logout,
    player,
    setPlayer,
    music,
    scope,
    setMusic,
    is_paused,
    setPaused,
    is_active,
    setActive,
    current_track,
    setTrack,
    AUTH_ENDPOINT,
    CLIENT_ID,
    REDIRECT_URI,
    RESPONSE_TYPE,
  };

  return (
    <SpotifyContext.Provider value={spotifyStoreValues}>
      {children}
    </SpotifyContext.Provider>
  );
};
export default SpotifyStore;
