import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addPoints,
  sliceTracks,
  getPlaylist,
  shufleTracks,
} from "../store/slice";

export default function Game({ handleChange }) {
  const [answer, setAnswer] = useState("");
  const [next, setNext] = useState(0);

  const dispatch = useDispatch();

  const tracks = useSelector((state) => state.state.tracks);
  const state = useSelector((state) => state.state);

  const currentTrack = {
    name: tracks[next].name,
    id: tracks[next].id,
    uri: tracks[next].uri,
  };

  useEffect(() => {
    dispatch(getPlaylist());

    dispatch(shufleTracks());

    dispatch(sliceTracks());
  }, [state.start]);

  useEffect(() => {
    if (currentTrack) {
      if (
        answer.toUpperCase() ===
        currentTrack.name.toUpperCase().replace(/.\(.+\)/, "")
      ) {
        dispatch(addPoints());
        setAnswer("");
      }
    }
  }, [answer]);

  useEffect(() => {
    if (next + 1 === state.tracks.length) handleChange();
  }, [next]);

  console.log(1, state.countTracks);
  console.log(2, state.tracks.length);
  //console.log("game");

  return (
    <div
      className={
        state.start === false || next + 1 === state.tracks.length
          ? "overlay"
          : ""
      }
      style={{ position: "relative" }}
    >
      <div
        style={{ height: "275px", width: "348px" }}
        //className="overlap"
      ></div>
      <div
        style={{ top: "301px", right: "86px", width: "20px", height: "20px" }}
        //className="overlap"
      ></div>
      <div
        style={{ top: "268px", width: "129px", height: "37px", left: "23px" }}
        //className="overlap"
      ></div>
      {currentTrack && (
        <iframe
          style={{ borderRadius: "12px" }}
          src={`https://open.spotify.com/embed/track/${currentTrack.id}?utm_source=generator&theme=0`}
          width="100%"
          height="352"
          allowFullScreen=""
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      )}
      <button onClick={() => setNext((value) => value + 1)}>Дальше</button>
      <form action="" onSubmit={(e) => e.preventDefault()}>
        <input
          value={answer}
          onChange={(e) => {
            setAnswer(e.target.value);
          }}
          type="text"
        />
      </form>
      <p>
        Ваши очки : {state.userPoints} / {tracks.length}
      </p>
    </div>
  );
}
