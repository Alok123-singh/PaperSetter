import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    noOfQueries : 0,
    title : '',
    score : '0',
    resultDescription : '',
    courseCode: '',
}

const resultSlice = createSlice({
    name: "result",
    initialState,
    reducers : {
        setResult: (state,action) => {
            state.noOfQueries = action.payload.noOfQueries;
            state.title = action.payload.title;
            state.score = action.payload.score;
            state.resultDescription = action.payload.resultDescription;
        },
        setCourseCode: (state,action) => {
            state.courseCode = action.payload;
        },
    }

})

export const { setResult, setCourseCode } = resultSlice.actions;

export default resultSlice.reducer;