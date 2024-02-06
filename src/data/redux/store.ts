import { combineReducers, configureStore } from '@reduxjs/toolkit';
import journalReducer from './reducers/journaling.reducer';
import userReducer from './reducers/user.reducer';

export const reducers = combineReducers({
  user: userReducer,
  session: journalReducer,
});

export type AppState = ReturnType<typeof reducers>;

export const store = configureStore({
  reducer: reducers,
});
