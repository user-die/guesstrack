import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { searchArtist } from "../functions";

function Search({ token, onChange }) {
  const [search, setSearch] = useState(""),
    [artistList, setArtistList] = useState();

  // поиск исполнителей

  useEffect(() => {
    if (search !== "") searchArtist(setArtistList, search, token);
  }, [search]);

  return (
    <div className="search">
      <h1>Выберите исполнителя</h1>
      <form>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></input>
      </form>

      <div className="list">
        {artistList &&
          artistList.map((element) => (
            <NavLink
              className="list-item"
              to="/artist"
              onClick={() => {
                onChange(
                  element.id,
                  element.name,
                  element.images[0],
                  element.followers.total,
                  element.genres
                );
              }}
              key={element.id}
            >
              <p>{element.name}</p>
              {element.images[0] && (
                <img className="img" src={element.images[0]["url"]}></img>
              )}
              <p>
                'Фоловеры: ' +{" "}
                {Intl.NumberFormat("ru").format(element.followers.total)}
              </p>
              <p className="list-item-genres">
                {element.genres.length == 0 ||
                  "Жанры: " + element.genres.join(" ")}
              </p>
            </NavLink>
          ))}
      </div>
    </div>
  );
}

export default Search;
