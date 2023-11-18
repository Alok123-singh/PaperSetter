import {configureStore} from '@reduxjs/toolkit'
import clockReducer from './clockSlice.js'
import queryReducer from './querySlice.js';

export const store = configureStore({
    reducer: {
        clock : clockReducer,
        query : queryReducer
    }
});
