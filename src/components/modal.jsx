import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import {
  setStart,
  setCountTracks,
  resetUserPoints,
  resetNext,
} from "../store/slice";

import ArtistCard from "./artistCard";
import ResultModal from "./resultModal";

export default function Modal({ finish }) {
  const artist = useSelector((state) => state.state.artist);
  const start = useSelector((state) => state.state.start);
  const tracks = useSelector((state) => state.state.tracks);
  const state = useSelector((state) => state.state);
  const dispatch = useDispatch();

  return (
    <AnimatePresence>
      <motion.div
        className="modal"
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 30, transition: { duration: 0.8 } }}
        exit={{ opacity: 0, y: 0, transition: { duration: 0.8 } }}
      >
        {start === false && (
          <div>
            <ArtistCard artist={artist} />

            <h2>Выберите количество треков</h2>
            <div className="buttons">
              <button
                className={state.countTracks === 10 && "active"}
                onClick={() => dispatch(setCountTracks(10))}
              >
                10
              </button>
              <button
                className={state.countTracks === 25 && "active"}
                onClick={() => dispatch(setCountTracks(25))}
              >
                25
              </button>
              <button
                className={state.countTracks > 25 && "active"}
                onClick={() => dispatch(setCountTracks(50))}
              >
                Все
              </button>
            </div>

            <div className="buttons">
              <NavLink
                onClick={() => {
                  dispatch(resetNext());
                  dispatch(setStart(true));
                  dispatch(resetUserPoints());
                }}
              >
                Начать
              </NavLink>
              <NavLink className="active" to="/">
                Назад
              </NavLink>
            </div>
          </div>
        )}

        {start === true && state.next + 1 === state.tracks.length && (
          <ResultModal />
        )}
      </motion.div>
    </AnimatePresence>
  );
}
