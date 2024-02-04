import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    context: 'login',
    page: 'home',
}

export const appSlice = createSlice({
    name: 'updateApp',
    initialState,
    reducers: {
        setContext: (state, action) => {
            state.context = action.payload;
        },
        setPage: (state, action) => {
            state.page = action.payload;
        },
    }
});

export const {
    setContext,
    setPage,
} = appSlice.actions;

export default appSlice.reducer;