import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
 
import userSlice from './user.slice';

const store = configureStore({
    reducer: {
        user: userSlice,
    },
    // middleware: (getDefaultMileware) => {
    //     return getDefaultMileware({
    //         serializableCheck: false
    //     }).concat()
    // }
});

setupListeners(store.dispatch);

export default store;