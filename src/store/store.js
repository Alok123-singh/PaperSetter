import {configureStore} from '@reduxjs/toolkit'
import {themeSlice, resultSlice, authSlice} from './index';

const store = configureStore({
    reducer : {
        theme: themeSlice,
        result: resultSlice,
        auth: authSlice,
        // add more slices for posts
    }
});

export default store;