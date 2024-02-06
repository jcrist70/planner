import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
 
import userSlice from './user.slice';
import appSlice from './app.slice';

const store = configureStore({
    reducer: {
        app: appSlice,
        user: userSlice,
    },
    middleware: (getDefaultMileware) => {
        return getDefaultMileware({
            serializableCheck: false
        }).concat()
    }
    // middleware: (getDefaultMileware) => {
    //     return getDefaultMileware({
    //         serializableCheck: false
    //     }).concat()
    // }
});

setupListeners(store.dispatch);

export default store;