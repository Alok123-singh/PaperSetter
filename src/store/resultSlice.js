import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    noOfQueries : 0,
    title : '',
    
}

const resultSlice = createSlice({
    name: "result",
    initialState,
    reducers : {
        
    }

})

export const { setTheme } = resultSlice.actions;

export default resultSlice.reducer;