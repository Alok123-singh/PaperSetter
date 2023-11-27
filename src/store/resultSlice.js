import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    noOfQueries : 0,
    title : '',
    score : '0',
}

const resultSlice = createSlice({
    name: "result",
    initialState,
    reducers : {
        setResult: (state,action) => {
            state.noOfQueries = action.payload.noOfQueries;
            state.title = action.payload.title;
            state.score = action.payload.score;
        },
    }

})

export const { setResult } = resultSlice.actions;

export default resultSlice.reducer;