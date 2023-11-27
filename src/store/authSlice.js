import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loginStatus: false,
    username: ''
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers : {
        setUsername: (state,action) => {
            state.username = action.payload;
        },
        setLoginStatus: (state,action) => {
            state.loginStatus = action.payload;
        }
    }

});

export const { setUsername, setLoginStatus } = authSlice.actions;

export default authSlice.reducer;