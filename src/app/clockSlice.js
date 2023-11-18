import {createSlice } from '@reduxjs/toolkit';

const initialState = {
    time : 30*60
}

export const clockSlice = createSlice({
    name: 'clock',
    initialState,
    reducers: {
        setClock : (state,action) => {
            state.time = action.payload;
        }
    }
})

export const { setClock } = clockSlice.actions

export default clockSlice.reducer