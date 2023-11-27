import {configureStore} from '@reduxjs/toolkit'
import {themeSlice, resultSlice} from './index';

const store = configureStore({
    reducer : {
        theme: themeSlice,
        result: resultSlice,
        // add more slices for posts
    }
});

export default store;