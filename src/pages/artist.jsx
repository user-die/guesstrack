import React, { useEffect, useState } from "react";
import { getPlaylist, shufleTracks } from "../store/slice";
import { useDispatch, useSelector } from "react-redux";

import Game from "../components/game";
import Modal from "../components/modal";

function Artist() {
  const [next, setNext] = useState(0);
  const [finish, setFinish] = useState(false);

  const dispatch = useDispatch();
  const state = useSelector((state) => state.state);

  console.log("artist");

  function handleChange() {
    setFinish(true);
  }

  return (
    <div className="game">
      {(state.start === true && finish) ||
        (state.start === false && <Modal finish={finish} />)}
      <Game handleChange={handleChange} />
    </div>
  );
}

export default Artist;
