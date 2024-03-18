import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPoints } from "../store/slice";

export default function Game({ next, nextChange }) {
  const [answer, setAnswer] = useState(""),
    [currentTrack, setCurrentTrack] = useState(0);

  const dispatch = useDispatch();

  const tracks = useSelector((state) => state.state.tracks);
  const state = useSelector((state) => state.state);

  console.log(next);

  useEffect(() => {
    if (tracks.length > 0 && next < tracks.length)
      setCurrentTrack({
        name: tracks[next].name,
        id: tracks[next].id,
        uri: tracks[next].uri,
      });
  }, [state.start, next]);

  useEffect(() => {
    if (currentTrack) {
      if (
        answer.toUpperCase() ===
        currentTrack.name.toUpperCase().replace(/.\(.+\)/, "")
      ) {
        nextChange();
        dispatch(addPoints());
        setAnswer("");
      }
    }
  }, [answer]);

  return (
    <div
      class={
        state.start === false || next + 1 === state.tracks.length
          ? "overlay"
          : ""
      }
      style={{ position: "relative" }}
    >
      {currentTrack && (
        <iframe
          id="iframe"
          src={`https://open.spotify.com/embed/track/${currentTrack.id}?utm_source=generator/play`}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          allowFullScreen
          loading="lazy"
        ></iframe>
      )}
      <button onClick={() => nextChange()}>Дальше</button>
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
