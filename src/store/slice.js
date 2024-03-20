import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import data from "./config";
import axios from "axios";

const slice = createSlice({
  name: "appState",
  initialState: {
    token: "",
    searchForm: "",
    artist: "",
    artistList: [],
    error: "",
    loading: false,
    start: false,
    tracks: [],
    countTracks: 0,
    userPoints: 0,
    next: 0,
  },
  reducers: {
    setArtist: (state, action) => {
      state.artist = action.payload;
    },

    setStart: (state, action) => {
      state.start = action.payload;
    },

    setCountTracks: (state, action) => {
      state.countTracks = action.payload;
    },

    sliceTracks: (state) => {
      state.tracks = state.tracks.slice(0, state.countTracks);
    },

    formHandleChange: (state, action) => {
      state.searchForm = action.payload;
    },

    addPoints: (state) => {
      state.userPoints = state.userPoints + 1;
    },

    addNext: (state) => {
      state.next = state.next + 1;
    },

    resetUserPoints: (state) => {
      state.userPoints = 0;
    },

    resetNext: (state) => {
      state.next = 0;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchToken.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchToken.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload;
    });

    builder.addCase(getPlaylist.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getPlaylist.fulfilled, (state, action) => {
      state.loading = false;
      state.tracks = action.payload;

      state.tracks = state.tracks.sort(() => Math.random() - 0.5);

      state.tracks = state.tracks.slice(0, state.countTracks);
    });
  },
});

export const fetchToken = createAsyncThunk(
  "appState/fetchGetToken",
  async () => {
    const response = await axios("https://accounts.spotify.com/api/token", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(data.id + ":" + data.secret),
      },
      data: "grant_type=client_credentials",
      method: "POST",
    });

    return response.data.access_token;
  }
);

export const getPlaylist = createAsyncThunk(
  "appState/getPlaylist",
  async function (_, { getState }) {
    const token = getState().state.token;
    const artistName = getState().state.artist.name;

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

    return tracks.data.items.map((el) => el.track);
  }
);

export const {
  setArtist,
  setStart,
  resetNext,
  setCountTracks,
  formHandleChange,
  addPoints,
  addNext,
  resetUserPoints,
  sliceTracks,
} = slice.actions;

export default slice.reducer;
