import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { UsersService } from 'src/data/api-client';

const initialState = {
  user: null,
  isLoggedIn: false,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const authenticateUser = createAsyncThunk<any>('auth/login', async (userData) => {
  const response = await UsersService.postApiV1UserSignup(userData);
  return response.data;
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.isLoggedIn = false;
    },
    login(state) {
      state.user = null;
      state.isLoggedIn = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticateUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(authenticateUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        state.status = 'failed';
        (state as any).error = action.error.message;
      });
  },
});

export const { logout, login } = userSlice.actions;

export default userSlice.reducer;
