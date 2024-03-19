import "./style.scss";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchToken } from "./store/slice.js";
import Search from "./pages/search.jsx";
import Artist from "./pages/artist.jsx";
import data from "./store/config.js";

// Автоплей музыки
// Ограничения по 10 / 25 / 50 треков
// Сделать таймер
// Коректная проверка названия
// Шрифты
// Переключающиеся темы
// Интернационализация (EN, SPain)
// Обработка ошибок

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchToken());
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Search />} />
      <Route path="/artist" element={<Artist />} />
    </Routes>
  );
}

export default App;
