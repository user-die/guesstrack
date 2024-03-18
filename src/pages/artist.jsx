import React, { useEffect, useState } from "react";
import { getPlaylist, shufleTracks } from "../store/slice";
import { useDispatch, useSelector } from "react-redux";

import Game from "../components/game";
import Modal from "../components/modal";

function Artist() {
  const [next, setNext] = useState(0);
  const dispatch = useDispatch();
  const state = useSelector((state) => state.state);

  useEffect(() => {
    dispatch(getPlaylist());
  }, []);

  useEffect(() => {
    dispatch(shufleTracks());
  }, [state.loading]);

  function nextChange() {
    if (next + 1 !== state.tracks.length) setNext((value) => value + 1);
  }

  return (
    <div className="game">
      {(state.start === true && next + 1 === state.tracks.length) ||
        (state.start === false && <Modal next={next} />)}
      <Game next={next} nextChange={nextChange} />
    </div>
  );
}

export default Artist;
