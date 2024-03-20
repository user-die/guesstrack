import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPoints, addNext } from "../store/slice";
import Nav from "./nav";

export default function Game({ handleChange }) {
  const [answer, setAnswer] = useState("");

  const [currentTrack, setCurrentTrack] = useState();

  const dispatch = useDispatch();

  const tracks = useSelector((state) => state.state.tracks);
  const state = useSelector((state) => state.state);
  console.log("game");

  useEffect(() => {
    setCurrentTrack({
      name: tracks[state.next].name,
      id: tracks[state.next].id,
      uri: tracks[state.next].uri,
    });
  }, [state.next]);

  useEffect(() => {
    if (currentTrack) {
      if (
        answer.toUpperCase() ===
        currentTrack.name.toUpperCase().replace(/.\(.+\)/, "")
      ) {
        dispatch(addPoints());
        dispatch(addNext());
        setAnswer("");
      }
    }
  }, [answer]);

  useEffect(() => {
    if (state.next + 1 === state.tracks.length) handleChange();
  }, [state.next]);

  return (
    <div
      className={
        state.start === false || state.next + 1 === state.tracks.length
          ? "overlay"
          : ""
      }
      style={{ position: "relative" }}
    >
      <Nav />
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
          allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      )}
      <button onClick={() => dispatch(addNext())}>Дальше</button>
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
