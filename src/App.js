import "./style.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Search from "./components/search.jsx";
import Artist from "./components/artist.jsx";

function App() {
  const [artistId, setArtistId] = useState();
  const [token, setToken] = useState();

  let id = "a0b12e2325914386adf27fd5312d5f59";
  let secret = "7b7cac440dd9433c9d5c62833b8c8910";

  function handleChange(value) {
    setArtistId(value);
  }

  // получение токена

  useEffect(() => {
    axios("https://accounts.spotify.com/api/token", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(id + ":" + secret),
      },
      data: "grant_type=client_credentials",
      method: "POST",
    }).then((response) => setToken(response.data.access_token));
  }, [id, secret]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Search token={token} onChange={handleChange} />}
        />
        <Route
          path="/artist"
          element={<Artist token={token} artistId={artistId} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
