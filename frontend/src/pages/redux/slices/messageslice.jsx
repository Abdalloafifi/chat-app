import { createSlice } from "@reduxjs/toolkit";
import { addFriends } from "../apicalls/messageapi";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    allClin: localStorage.getItem("allClin")
      ? JSON.parse(localStorage.getItem("allClin"))
      : [null],
    getFriends: localStorage.getItem("getFriends")
      ? JSON.parse(localStorage.getItem("getFriends"))
      : [null],
    getUsers: [null],
    getConfirmFriends: [],
    commchat: localStorage.getItem("commchat")
      ? JSON.parse(localStorage.getItem("commchat"))
      : [null],
    getMessages: [],
    likeMessage: null,

  },
  reducers: {
    getCline(state, action) {
      state.allClin = action.payload;
    },

    getFriends(state, action) {
      state.getFriends = action.payload;
    }
    ,
    getUsers(state, action) {
      state.getUsers = action.payload;
    },
    getConfirmFriends(state, action) {
      state.getConfirmFriends = action.payload;
    },
    commchat(state, action) {
      state.commchat = action.payload;
    },
    getMessage(state, action) {
      state.getMessages = action.payload;
    },
    // في messageslice.jsx، عدّل reducer addFriends:
    // Reducer لإضافة صديق
    addFriends(state, action) {
      state.getUsers = state.getUsers.filter(
        user => user._id !== action.payload._id
      );
    },

    // Reducer لتأكيد الصداقة
    ConfirmFriends(state, action) {
      if (state.getConfirmFriends.FriendRequests) {
        state.getConfirmFriends.FriendRequests =
          state.getConfirmFriends.FriendRequests.filter(
            user => user._id !== action.payload._id
          );
      }
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
    deleteactiv(state) {
      state.getMessages = null;

    },

  },
});

const massReducer = messageSlice.reducer;
const massActions = messageSlice.actions;
export { massReducer, massActions };