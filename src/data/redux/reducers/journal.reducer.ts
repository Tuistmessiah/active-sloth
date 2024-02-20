import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Day } from 'src/data/interfaces/models.interface';

import { initJournal } from '../initial-state';

const journalSlice = createSlice({
  name: 'journal',
  initialState: initJournal,
  reducers: {
    /**
     * Sets selectedDay if undefined
     * @returns
     */
    setCurrentMonth: (state, action: PayloadAction<Day[]>) => {
      state.currentMonth = action.payload;
      if (!state.selectedDay.date) {
        const date = new Date().toISOString();
        const day = (state.currentMonth || []).find((day) => day.date === date);
        state.selectedDay = { date, data: day };
      }
    },
    setDay: (state, action: PayloadAction<{ day: Day; id: string }>) => {
      if (!state.currentMonth) return;

      const dayIndex = state.currentMonth.findIndex((day) => day.id === action.payload.id);
      if (dayIndex !== -1) {
        state.currentMonth[dayIndex] = action.payload.day;
      } else {
        // state.currentMonth = [...state.currentMonth, action.payload.day];
        // TODO: Show some notification over not existing. This shouldn't happen. Dev error from frontend.
      }
    },
    /**
     * Select a day. If "date" undefined, "data" too.
     * @param date iso string.
     * @param date search for day in "currentMonth"
     */
    selectDay: (state, action: PayloadAction<{ date?: string }>) => {
      const { date } = action.payload;

      if (!date) state.selectedDay = { date: undefined, data: undefined };
      else {
        const day = (state.currentMonth || []).find((day) => day.date === date);
        state.selectedDay = { date, data: day };
      }
    },
  },
});

export const { setCurrentMonth, setDay, selectDay } = journalSlice.actions;
export default journalSlice.reducer;
