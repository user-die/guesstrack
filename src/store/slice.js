import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "appState",
  initialState: {
    token: "",
    artist: {},
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setArtist: (state, action) => {
      state.generalState.artist = action.payload;
    },
  },
});

export const { setToken } = slice.actions;

export default slice.reducer;
