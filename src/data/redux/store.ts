import { combineReducers, configureStore } from '@reduxjs/toolkit';

import journalReducer from './reducers/journal.reducer';
import sessionReducer from './reducers/session.reducer';
import userReducer from './reducers/user.reducer';

export const reducers = combineReducers({
  journal: journalReducer,
  session: sessionReducer,
  user: userReducer,
});

export type AppState = ReturnType<typeof reducers>;

export const store = configureStore({
  reducer: reducers,
});
export const dispatch = store.dispatch;
export function state(): AppState {
  return store.getState();
}
