import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TriggerPayload } from 'src/data/interfaces/redux.interface';

import { initSession } from '../initial-state';

const sessionSlice = createSlice({
  name: 'session',
  initialState: initSession,
  reducers: {
    setTrigger: (state, action: PayloadAction<TriggerPayload>) => {
      const trigger = action.payload;
      state.triggers[trigger.name] = trigger;
    },
    clearTrigger: (state, action: PayloadAction<TriggerPayload['name']>) => {
      delete state.triggers[action.payload];
    },
  },
});

export const { setTrigger, clearTrigger } = sessionSlice.actions;
export default sessionSlice.reducer;
