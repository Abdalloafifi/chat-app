import { createSlice } from "@reduxjs/toolkit"
const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: localStorage.getItem("user") ?
            JSON.parse(localStorage.getItem("user")) : null,

    },
    reducers: {
        login(state, action) {
            state.user = action.payload;
        },
        logout(state) {
            state.user = null;

        },
        viledLogin(state, action) {
            state.user = action.payload; // تأكد من هيكل البيانات
        },
        register(state, action) {
            state.user = action.payload; // تأكد من هيكل البيانات
        },
        deleteUser(state) {
            state.user = null; // تأكد من هيكل البيانات
        },
        setUserPhoto: (state, action) => {
            if (state.user) {
                state.user.avatar = action.payload;
            }
        },
        setIsOk(state, action) {
            if (state.user) {
                state.user.isok = action.payload;
            }
        }
    },
});
const authReducer = authSlice.reducer;
const authActions = authSlice.actions;
export { authReducer, authActions };