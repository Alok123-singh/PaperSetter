import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    queries: [],
    queryNo: -1,
    changeStatus: false,
    allowed : false
}

export const querySlice = createSlice({
    name: 'query',
    initialState,
    reducers: {
        setAllQueries : (state,action) => {
            state.queries = action.payload;
        },
        setQueryNo : (state,action) => {
            state.queryNo = action.payload;
        },
        getCurrentQuery: (state) => {
            return state.queries[action.payload];
        },
        incrementQuery: (state) => {
            state.queryNo++;
        },
        changeQuery: (state,action) => {
            state.changeStatus = action.payload;
        },
        setAllowed: (state,action) => {
            state.allowed = action.payload;
        }
    }
})

export const { setAllQueries, setQueryNo, incrementQuery, changeQuery, setAllowed } = querySlice.actions

export default querySlice.reducer