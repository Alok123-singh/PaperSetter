import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    themeMode : 'dark'
}

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers : {
        toggleTheme : (state) => {
            state.themeMode = state.themeMode === 'light' ? 'dark' : 'light';
        }
    }

})

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;