import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Day } from 'src/data/interfaces/models.interface';

import { initJournal } from '../initial-state';

const journalSlice = createSlice({
  name: 'journal',
  initialState: initJournal,
  reducers: {
    setCurrentMonth: (state, action: PayloadAction<Day[]>) => {
      state.currentMonth = action.payload;
    },
    setDay: (state, action: PayloadAction<{ day: Day; id: string }>) => {
      const dayIndex = state.currentMonth.findIndex((day) => day.id === action.payload.id);
      if (dayIndex !== -1) {
        state.currentMonth[dayIndex] = action.payload.day;
      } else {
        // state.currentMonth = [...state.currentMonth, action.payload.day];
        // TODO: Show some notification over not existing. This shouldn't happen. Dev error from frontend.
      }
    },
    /**
     * Select a day: to edit in the form
     * @param date iso string. If undefined, edit today day.
     * @param date if set, just overwrite in redux
     */
    selectDay: (state, action: PayloadAction<{ date?: string; data?: Day }>) => {
      const { date, data } = action.payload;
      // Overwrite
      if (data && date) {
        state.selectedDay = { date, data };
        return;
      }
      // If no date, get "today"
      if (!date) {
        const day = state.currentMonth[0];
        state.selectedDay = { date: day.date, data: day };
        return;
      }
      // TODO: Change to find day by id
      const day = state.currentMonth.find((day) => day.date === date);
      if (!day) {
        state.selectedDay = { date: date, data: undefined };
        return;
      }
      // Find day by date and set
      state.selectedDay = { date: day.date, data: day };
    },
  },
});

export const { setCurrentMonth, setDay, selectDay } = journalSlice.actions;
export default journalSlice.reducer;
