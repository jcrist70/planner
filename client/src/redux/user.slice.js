import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loginStatus: false,
    id: '',
    name: '',
    email: '',
    emailVerified: '',
    role: '',
    accessToken: null
}

export const appSlice = createSlice({
    name: 'updateUser',
    initialState,
    reducers: {
        setId: (state, action) => {
            state.id = action.payload._id;
        },
        setUser: (state, action) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
        },
        setLoginStatus: (state, action) => {
            state.loginStatus = action.payload.loginStatus;
        },
        setEmailVerified: (state, action) => {
            state.emailVerified = action.payload.emailVerified;
        },
        setRole: (state, action) => {
            state.role = action.payload.role;
        },
        setAccessToken: (state, action) => {
            state.accessToken = action.payload.accessToken;
        },
    }
});

export const {
    setId,
    setUser,
    setLoginStatus,
    setEmailVerified,
    setRole,
    setAccessToken
} = appSlice.actions;

export default appSlice.reducer;