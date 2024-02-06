import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loggedIn: false,
    lastLoginAt: null,
    id: '',
    name: '',
    email: '',
    emailVerified: false,
    region: null,
    role: '',
    accessToken: null
}

export const userSlice = createSlice({
    name: 'updateUser',
    initialState,
    reducers: {
        setId: (state, action) => {
            state.id = action.payload.data;
        },
        setUser: (state, action) => {
            console.log('--------> setUser action.payload:', action.payload.data)
            state.loggedIn = action.payload.data.loggedIn;
            state.email = action.payload.data.email;
            state.emailVerified = action.payload.data.emailVerified;
            state.lastLoginAt = action.payload.data.lastLoginAt;
            state.name = action.payload.data.name;
            state.region = action.payload.data.region;
            state.role = action.payload.data.role;
        },
        setLoginStatus: (state, action) => {
            state.loginStatus = action.payload;
        },
        setEmailVerified: (state, action) => {
            state.emailVerified = action.payload.data;
        },
        setRole: (state, action) => {
            state.role = action.payload.data.role;
        },
        setAccessToken: (state, action) => {
            state.accessToken = action.payload.data;
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
} = userSlice.actions;

export default userSlice.reducer;