// app/store.js
import { configureStore } from '@reduxjs/toolkit';
import journalReducer from './reducers/journaling.reducer';

export const store = configureStore({
    reducer: {
        journal: journalReducer,
    },
});
