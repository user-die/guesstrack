import "./style.scss";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchToken } from "./store/slice.js";
import Search from "./pages/search.jsx";
import Artist from "./pages/artist.jsx";

// После обновления сохранять треки
// Сделать таймер
// Коректная проверка названия
// Переключающиеся темы
// Интернационализация (EN, SPain)
// Обработка ошибок

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchToken());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Search />} />
      <Route path="/artist" element={<Artist />} />
    </Routes>
  );
}

export default App;
