// src/slices/messageslice.jsx
import { createSlice } from "@reduxjs/toolkit";

const profile = createSlice({
  name: "profile",
  initialState: {
    profile: null,
  },
  reducers: {
    getprofile(state, action) {
      state.profile = action.payload;
    },
    updateavatar(state, action) {
      state.profile = action.payload;
    },

    updatauser(state, action) {
      state.profile = action.payload;
    },
    isokuser(state, action) {
      state.profile = action.payload;
    },
  },
});

const proReducer = profile.reducer;
const proActions = profile.actions;
export { proReducer, proActions };