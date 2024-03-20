import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { setArtist, setStart, formHandleChange } from "../store/slice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Nav from "../components/nav";

export default function Search() {
  const [artistList, setArtistList] = useState([]);

  const dispatch = useDispatch();
  const token = useSelector((state) => state.state.token);
  const search = useSelector((state) => state.state.searchForm);

  // поиск исполнителей

  console.log("search");

  useEffect(() => {
    if (search !== "") searchArtist(setArtistList, search, token);

    if (search === "") setArtistList([]);
  }, [search]);

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

  const upStyle = {
    top: "40%",
    animation: "upAnimation 450ms ease-in",
  };
  const downStyle = {
    animation: "downAnimation 450ms ease-out",
  };

  return (
    <div className="search">
      <Nav />

      <span
        className="search-anim"
        style={artistList.length === 0 ? upStyle : downStyle}
      >
        <h1>Выберите исполнителя</h1>
        <form>
          <input
            name="search"
            value={search}
            onChange={(e) => dispatch(formHandleChange(e.target.value))}
          ></input>
        </form>
      </span>

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
                  "Жанры: " + element.genres.join(", ")}
              </p>
            </NavLink>
          ))}
      </div>
    </div>
  );
}
