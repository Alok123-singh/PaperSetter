import { createSlice } from "@reduxjs/toolkit";
import { ROLES } from '../roles/index'

const initialState = {
    loginStatus: true,
    username: 'admin',
    email : 'aloksinghbais02@gmail.com',
    fullName : 'Alok Singh Bais',
    role : ROLES.ADMIN,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers : {
        setUsername: (state,action) => {
            state.username = action.payload;
        },
        setLoginStatus: (state,action) => {
            state.loginStatus = action.payload;
        },
        setRole: (state, action) => {
            state.role = action.payload;
        },
        setEmail: (state,action) => {
            state.email = action.payload;
        },
        setFullName: (state,action) => {
            state.fullName = action.payload;
        },
    }

});

export const { setUsername, setLoginStatus, setRole, setEmail, setFullName } = authSlice.actions;

export default authSlice.reducer;