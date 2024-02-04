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

export const userSlice = createSlice({
    name: 'updateUser',
    initialState,
    reducers: {
        setId: (state, action) => {
            state.id = action.payload;
        },
        setUser: (state, action) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
        },
        setLoginStatus: (state, action) => {
            state.loginStatus = action.payload;
        },
        setEmailVerified: (state, action) => {
            state.emailVerified = action.payload;
        },
        setRole: (state, action) => {
            state.role = action.payload.role;
        },
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
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