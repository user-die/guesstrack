import React, { useEffect, useState } from "react";
import { getPlaylist } from "../store/slice";
import { useDispatch, useSelector } from "react-redux";

import Game from "../components/game";
import Modal from "../components/modal";

export default function Artist() {
  const [next, setNext] = useState(0);
  const [finish, setFinish] = useState(false);

  const state = useSelector((state) => state.state);

  function handleChange() {
    setFinish(true);
  }

  console.log("artist");

  return (
    <div className="game">
      {state.start === false || state.next === state.tracks.length ? (
        <Modal finish={finish} />
      ) : (
        <Game handleChange={handleChange} />
      )}
    </div>
  );
}
