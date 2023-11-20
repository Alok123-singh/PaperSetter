import {configureStore} from '@reduxjs/toolkit'
import themeSlice from './themeSlice';

const store = configureStore({
    reducer : {
        theme: themeSlice
        // add more slices for posts
    }
});

export default store;