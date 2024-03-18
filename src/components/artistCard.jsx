import React from "react";

export default function ArtistCard({ artist }) {
  return (
    <div>
      {artist.image && <img src={artist.image["url"]}></img>}
      <h1>{artist.name}</h1>
      <p>Фоловеры: {Intl.NumberFormat("ru").format(artist.followers)}</p>
      <p className="list-item-genres">
        {artist.genres.length == 0 || "Жанры: " + artist.genres.join(", ")}
      </p>
    </div>
  );
}
