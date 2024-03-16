import axios from "axios";

export function shuffleTracks(array) {
  return array.sort(() => Math.random() - 0.5);
}

export function checkAnswer(answer, rightAnswer, callback, func, addPoint) {
  if (
    answer.toUpperCase() === rightAnswer.toUpperCase().replace(/.\(.+\)/, "")
  ) {
    callback((value) => value + 1);
    func("");
    addPoint((value) => value + 1);
  }
}

export function searchPlaylist(artist, token, callback) {
  axios(
    `https://api.spotify.com/v1/search?query=this+is+${artist}&type=playlist&locale=ru-RU%2Cru%3Bq%3D0.9%2Cen-US%3Bq%3D0.8%2Cen%3Bq%3D0.7&offset=0&limit=20`,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  ).then((response) => {
    axios(
      response.data.playlists.items.filter(
        (el) => el.owner.display_name === "Spotify"
      )[0].tracks.href,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    ).then((response) => {
      console.log(response.data.items.map((el) => el.track));
      callback(response.data.items.map((el) => el.track));
    });
  });
}

export function searchArtist(callback, search, token) {
  axios(`https://api.spotify.com/v1/search?type=artist&q=${search}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  }).then((response) => callback(response.data.artists.items));
}
