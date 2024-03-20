import axios from "axios";

export function shufleTracks(tracks) {
  return tracks.sort(() => Math.random() - 0.5);
}

export async function getToken(id, secret, callback) {
  const response = await axios("https://accounts.spotify.com/api/token", {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(id + ":" + secret),
    },
    data: "grant_type=client_credentials",
    method: "POST",
  });

  callback(response.data.access_token);
}

export async function searchArtist(token, search, callback) {
  const response = await axios(
    `https://api.spotify.com/v1/search?type=artist&q=${search}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  callback(response.data.artists.items);
}

export async function getPlaylist(token, artistName, callback) {
  const response = await axios(
    `https://api.spotify.com/v1/search?query=this+is+${artistName}&type=playlist&locale=ru-RU%2Cru%3Bq%3D0.9%2Cen-US%3Bq%3D0.8%2Cen%3Bq%3D0.7&offset=0&limit=20`,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  const tracks = await axios(
    response.data.playlists.items.filter(
      (el) => el.owner.display_name === "Spotify"
    )[0].tracks.href,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  callback(tracks.data.items.map((el) => el.track));
}
