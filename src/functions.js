import axios from "axios";

export function unique(array) {
  return [...new Set(array)];
}

export function deleteRemix(array) {
  return array.filter((el) => !el.includes("Remix") && !el.includes("Mix"));
}

export function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

export function getRandom(array) {
  let i = 0;
  while (i < array.length) {
    return array[i];
  }
}

export function getAlbums(offset, func, token, artistId) {
  axios(
    `https://api.spotify.com/v1/artists/${artistId}/albums?limit=50&offset=${offset}`,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  ).then((response) => func((albums) => [...albums, ...response.data.items]));
}

export function searchArtist(func, search, token) {
  axios(`https://api.spotify.com/v1/search?type=artist&q=${search}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  }).then((response) => func(response.data.artists.items));
}

export function getTracks(func, id, token) {
  axios(`https://api.spotify.com/v1/albums/${id}/tracks`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  }).then((response) =>
    func((oldArray) => [
      ...oldArray,
      ...response.data.items.map((item) => item.name),
    ])
  );
}
