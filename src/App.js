import "./style.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "./store/slice.js";

import Search from "./pages/search.jsx";
import Artist from "./pages/artist.jsx";

// Redux persist
// Автоплей музыки
// Ограничения по 10 / 25 / 50 треков
// Коректная проверка названия
// Шрифты
// Переключающиеся темы
// Интернационализация

function App() {
  const dispatch = useDispatch();

  const [artist, setArtist] = useState();
  //[token, setToken] = useState();

  function handleChange(id, name, image, followers, genres) {
    setArtist({
      name: name,
      id: id,
      image: image,
      followers: followers,
      genres: genres,
    });
  }

  // получение токена

  useEffect(() => {
    axios("https://accounts.spotify.com/api/token", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(data.id + ":" + data.secret),
      },
      data: "grant_type=client_credentials",
      method: "POST",
    }).then((response) => dispatch(setToken(response.data.access_token)));
  }, []);

  const state = useSelector((state) => state.state);

  console.log(state);

  return (
    <Routes>
      <Route
        path="/"
        element={<Search token={token} onChange={handleChange} />}
      />
      <Route
        path="/artist"
        element={<Artist token={token} artist={artist} />}
      />
    </Routes>
  );
}

export default App;
