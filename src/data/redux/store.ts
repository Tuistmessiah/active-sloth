import { configureStore } from '@reduxjs/toolkit';
import journalReducer from './reducers/journaling.reducer';
import userReducer from './reducers/user.reducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
    journal: journalReducer,
  },
});
