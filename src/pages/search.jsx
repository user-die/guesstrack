import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { setArtist, setStart, formHandleChange } from "../store/slice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import ArtistCard from "../components/artistCard";

function Search() {
  const [artistList, setArtistList] = useState([]);

  const dispatch = useDispatch();
  const state = useSelector((state) => state.state);

  // поиск исполнителей

  useEffect(() => {
    if (state.searchForm !== "")
      searchArtist(setArtistList, state.searchForm, state.token);

    if (state.searchForm === "") setArtistList([]);
  }, [state.searchForm]);

  useEffect(() => {
    dispatch(setStart(false));
  }, []);

  function searchArtist(callback, search, token) {
    axios(`https://api.spotify.com/v1/search?type=artist&q=${search}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((response) => callback(response.data.artists.items));
  }

  return (
    <div className="search">
      <h1>Выберите исполнителя</h1>
      <form>
        <input
          value={state.searchForm}
          onChange={(e) => dispatch(formHandleChange(e.target.value))}
        ></input>
      </form>

      <div className="list">
        {artistList &&
          artistList.map((element) => (
            <NavLink
              className="list-item"
              to="/artist"
              onClick={() =>
                dispatch(
                  setArtist({
                    id: element.id,
                    name: element.name,
                    image: element.images[0],
                    followers: element.followers.total,
                    genres: element.genres,
                  })
                )
              }
              key={element.id}
            >
              <p>{element.name}</p>
              {element.images[0] && (
                <img className="img" src={element.images[0]["url"]}></img>
              )}
              <p>
                Фоловеры:{" "}
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
