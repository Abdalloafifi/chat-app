import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    allClin: localStorage.getItem("allClin")
      ? JSON.parse(localStorage.getItem("allClin"))
      : null,
    getMessages: [],
    likeMessage: null,
  },
  reducers: {
    getCline(state, action) {
      state.allClin = action.payload;
    },
    getMessage(state, action) {
      state.getMessages = action.payload;
    },
    addNewMessage(state, action) {
      state.getMessages.push(action.payload);
    },

    deleteMessage(state, action) {
      state.getMessages = state.getMessages.filter(
        msg => msg._id !== action.payload
      );
    },
    likeMessage(state, action) {
      state.likeMessage = action.payload;
    },
  },
});

const massReducer = messageSlice.reducer;
const massActions = messageSlice.actions;
export { massReducer, massActions };