// src/store.jsx
import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { massReducer } from "./slices/messageslice";
import { proReducer } from "./slices/profileslice";

export default configureStore({
    reducer: {
        auth: authReducer,
        message: massReducer,
        profile: proReducer
    },
});