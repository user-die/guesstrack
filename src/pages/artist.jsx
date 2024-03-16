import React, { useEffect, useState } from "react";
import { shuffleTracks, checkAnswer, searchPlaylist } from "../functions";
import axios from "axios";

import Game from "../components/game";
import Modal from "../components/modal";

function Artist({ token, artist }) {
  const [tracks, setTracks] = useState([]),
    [start, setStart] = useState(false);

  useEffect(() => {
    searchPlaylist(artist.name, token, setTracks);
  }, [token]);

  useEffect(() => {
    localStorage.setItem("tracks", tracks);
    shuffleTracks(tracks);
  }, [tracks]);

  function hangleSubmit() {
    setStart(true);
  }

  return (
    <div className="game">
      <Modal artist={artist} start={start} onChange={hangleSubmit} />
      <Game tracks={tracks} start={start} token={token} />
    </div>
  );
}

export default Artist;
