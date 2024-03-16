import React from "react";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

export default function Modal({ artist, start, onChange }) {
  console.log(start);
  return (
    <AnimatePresence>
      {start === false && (
        <motion.div
          className="modal"
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 30, transition: { duration: 0.8 } }}
          exit={{ opacity: 0, y: 0, transition: { duration: 0.8 } }}
        >
          <div>
            {artist.image && <img src={artist.image["url"]}></img>}
            <h1>{artist.name}</h1>
            <p>Фоловеры: {Intl.NumberFormat("ru").format(artist.followers)}</p>
            <p className="list-item-genres">
              {artist.genres.length == 0 || "Жанры: " + artist.genres.join(" ")}
            </p>
          </div>
          <div className="buttons">
            <NavLink onClick={onChange}>Начать</NavLink>
            <NavLink to="/">Назад</NavLink>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
