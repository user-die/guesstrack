import React, { useEffect, useState } from "react";
import { getPlaylist } from "../store/slice";
import { useDispatch, useSelector } from "react-redux";

import Game from "../components/game";
import Modal from "../components/modal";

function Artist() {
  const [next, setNext] = useState(0);
  const [finish, setFinish] = useState(false);

  const dispatch = useDispatch();
  const state = useSelector((state) => state.state);

  useEffect(() => {
    dispatch(getPlaylist());
  }, []);

  function handleChange() {
    setFinish(true);
  }

  return (
    <div className="game">
      {state.start === false || state.next + 1 === state.tracks.length ? (
        <Modal finish={finish} />
      ) : (
        <Game handleChange={handleChange} />
      )}
    </div>
  );
}

export default Artist;
