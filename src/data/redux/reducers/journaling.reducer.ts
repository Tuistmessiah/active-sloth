import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Day } from 'src/data/interfaces/models.interface';

import { initialJournalState } from '../initial-state';

// export const fetchEntriesByMonth = createAsyncThunk('journal/fetchEntriesByMonth', async (dateRange) => {
//   // const response = await journalAPI.fetchMonthEntries(dateRange);
//   // return response;
// });

const journalSlice = createSlice({
  name: 'journal',
  initialState: initialJournalState,
  reducers: {
    setCurrentMonth: (state, action: PayloadAction<Day[]>) => {
      state.currentMonth = action.payload;
    },
    setDay: (state, action: PayloadAction<{ day: Day; date: Date }>) => {
      const dayIndex = state.currentMonth.findIndex((day) => day.date === action.payload.date);
      if (dayIndex) state.currentMonth[dayIndex] = action.payload.day;
      else {
        // TODO: Show some notification over not existing. This shouldn't happen. Dev error from frontend.
      }
    },
  },
});

export const { setCurrentMonth, setDay } = journalSlice.actions;
export default journalSlice.reducer;
