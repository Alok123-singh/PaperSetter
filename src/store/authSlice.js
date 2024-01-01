import { createSlice } from "@reduxjs/toolkit";
import { ROLES } from '../roles/index'

const initialState = {
    loginStatus: true,
    username: '',
    email : '',
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
        }
    }

});

export const { setUsername, setLoginStatus, setRole, setEmail } = authSlice.actions;

export default authSlice.reducer;