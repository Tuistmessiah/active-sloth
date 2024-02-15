import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { initialUserState } from '../initial-state';

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    logout(state) {
      state.userData = null;
      state.isLoggedIn = false;
      // TODO: Use session loading
    },
    login(state, action: PayloadAction<any>) {
      state.userData = action.payload.user;
      state.isLoggedIn = true;
    },
    resetIsLogging(state, action: PayloadAction<boolean>) {
      state.isLogging = action.payload;
    },
  },
});

export const { logout, login, resetIsLogging } = userSlice.actions;

export default userSlice.reducer;
