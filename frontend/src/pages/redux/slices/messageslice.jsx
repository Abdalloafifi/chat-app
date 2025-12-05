import { createSlice } from "@reduxjs/toolkit";
import { addFriends } from "../apicalls/messageapi";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    allClin: localStorage.getItem("allClin")
      ? JSON.parse(localStorage.getItem("allClin"))
      : [],
    getFriends: localStorage.getItem("getFriends")
      ? JSON.parse(localStorage.getItem("getFriends"))
      : [],
    getUsers: [],
    getConfirmFriends: [],
    commchat: localStorage.getItem("commchat")
      ? JSON.parse(localStorage.getItem("commchat"))
      : [],
    getMessages: [],
    likeMessage: null,
    onlineUsers: [], // قائمة المستخدمين المتصلين
  },
  reducers: {
    setOnlineUsers(state, action) {
      state.onlineUsers = action.payload;
    },
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
      const newMessage = action.payload;

      // 1. Add to messages list if not exists
      const messageExists = state.getMessages.some(msg => msg._id === newMessage._id);
      if (!messageExists) {
        state.getMessages.push(newMessage);
      }

      // 2. Update Friend List (Sidebar) with Last Message
      // Ensure getFriends is an array and filter out nulls just in case
      if (!Array.isArray(state.getFriends)) {
        state.getFriends = [];
      }

      const friendIndex = state.getFriends.findIndex(
        f => f && (f._id === newMessage.senderId || f._id === newMessage.receiverId)
      );

      if (friendIndex !== -1) {
        const friend = state.getFriends[friendIndex];

        // Update last message info
        friend.lastMessage = {
          text: newMessage.text || (newMessage.file ? '📎 ملف' : 'رسالة صوتية'),
          createdAt: newMessage.createdAt,
          senderId: newMessage.senderId
        };

        // Move to top
        state.getFriends.splice(friendIndex, 1);
        state.getFriends.unshift(friend);
      }
    },

    deleteMessage(state, action) {
      state.getMessages = state.getMessages.filter(
        msg => msg._id !== action.payload.messageId
      );
    },

    updateMessageLike(state, action) {
      const { messageId, likes } = action.payload;
      const message = state.getMessages.find(msg => msg._id === messageId);
      if (message) {
        message.like = likes;
      }
    },

    updateMessageText(state, action) {
      const updatedMessage = action.payload;
      const index = state.getMessages.findIndex(msg => msg._id === updatedMessage._id);
      if (index !== -1) {
        state.getMessages[index] = updatedMessage;
      }
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