import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  unique,
  deleteRemix,
  shuffle,
  getRandom,
  getAlbums,
} from "../functions";

function Artist({ token, artistId }) {
  const [albums, setAlbums] = useState([]),
    [tracks, setTracks] = useState([]),
    [currentTrack, setCurrentTrack] = useState(),
    [trackId, setTrackId] = useState(),
    [next, setNext] = useState(0),
    [start, setStart] = useState(false);

  // Загрузка альбомов
  useEffect(() => {
    getAlbums(0, setAlbums, token, artistId);
    getAlbums(1, setAlbums, token, artistId);
    getAlbums(2, setAlbums, token, artistId);
    getAlbums(3, setAlbums, token, artistId);
    getAlbums(4, setAlbums, token, artistId);
    getAlbums(5, setAlbums, token, artistId);
  }, [token]);

  // Загрузка треков
  useEffect(() => {
    if (albums) {
      albums.forEach((el) =>
        axios(`https://api.spotify.com/v1/albums/${el.id}/tracks`, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        }).then((response) => {
          setTracks((oldArray) => [
            ...oldArray,
            ...response.data.items.map((item) => item.name),
          ]);
        })
      );
    }
  }, [albums]);

  // Рандомный трек
  useEffect(() => {
    setCurrentTrack(getRandom(shuffle(deleteRemix(unique(tracks)))));
  }, [start, next]);

  // Получение id трека

  useEffect(() => {
    if (currentTrack) {
      axios(
        `https://api.spotify.com/v1/search?q=${currentTrack}&type=track&limit=50`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      ).then((response) => {
        const artist = response.data.tracks.items[0].artists.filter(
          (el) => el.id == artistId
        )[0];

        try {
          setTrackId(
            response.data.tracks.items.filter((el) =>
              el.artists.includes(artist)
            )[0].id
          );
        } catch (error) {
          console.log(error);
        }
      });
    }
  }, [currentTrack]);

  console.log("Ответ", currentTrack);

  return (
    <div className="game">
      <iframe
        src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator`}
        allowfullscreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>

      <button onClick={() => setStart(true)}>Начать</button>
      <button onClick={() => setNext((value) => value + 1)}>Дальше</button>
      <form action="">
        <input type="text" />
      </form>
    </div>
  );
}

export default Artist;
