import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name: "message",
    initialState: {
        allClin: localStorage.getItem("allClin")
            ? JSON.parse(localStorage.getItem("allClin"))
            : null,
        getMessages: null,
        likeMessage: null,
    },
    reducers: {
        getCline(state, action) {
            state.allClin = action.payload;
        },
        getMessage(state, action) {
            state.getMessages = action.payload;
        },
        likeMessage(state, action) {
            state.likeMessage = action.payload;
        },
    },
});

const massReducer = messageSlice.reducer;
const massActions = messageSlice.actions;
export { massReducer, massActions };