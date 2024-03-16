import React, { useState, useEffect } from "react";
import { checkAnswer } from "../functions";

export default function Game({ tracks, start, token }) {
  const [answer, setAnswer] = useState(""),
    [points, setPoints] = useState(0),
    [next, setNext] = useState(0),
    [currentTrack, setCurrentTrack] = useState(0);

  useEffect(() => {
    if (tracks.length > 0)
      setCurrentTrack({
        name: tracks[next].name,
        id: tracks[next].id,
        uri: tracks[next].uri,
      });
  }, [start, next]);

  useEffect(() => {
    if (currentTrack) {
      checkAnswer(answer, currentTrack.name, setNext, setAnswer, setPoints);
    }
  }, [answer]);

  return (
    <div class={start === false ? "overlay" : ""}>
      {currentTrack && (
        <iframe
          id="iframe"
          src={`https://open.spotify.com/embed/track/${currentTrack.id}?utm_source=generator/play`}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          allowFullScreen
          loading="lazy"
        ></iframe>
      )}
      <button
        onClick={() => {
          setNext((value) => value + 1);
        }}
      >
        Дальше
      </button>
      <form action="">
        <input
          value={answer}
          onChange={(e) => {
            setAnswer(e.target.value);
          }}
          type="text"
        />
      </form>

      <p>
        Ваши очки : {points} / {tracks.length}
      </p>
    </div>
  );
}
