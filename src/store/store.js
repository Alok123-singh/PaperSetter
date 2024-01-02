import {configureStore} from '@reduxjs/toolkit'
import {themeSlice, resultSlice, authSlice, courseSlice} from './index';

const store = configureStore({
    reducer : {
        theme: themeSlice,
        result: resultSlice,
        auth: authSlice,
        course: courseSlice,
        // add more slices for posts
    }
});

export default store;