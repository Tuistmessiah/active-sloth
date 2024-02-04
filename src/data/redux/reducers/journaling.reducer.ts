import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import * as journalAPI from '../../services/journalAPI';

export const fetchEntriesByMonth = createAsyncThunk('journal/fetchEntriesByMonth', async (dateRange) => {
    // const response = await journalAPI.fetchMonthEntries(dateRange);
    // return response;
});

const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        entries: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(fetchEntriesByMonth.pending, (state) => {
    //             state.status = 'loading';
    //         })
    //         .addCase(fetchEntriesByMonth.fulfilled, (state, action) => {
    //             state.status = 'succeeded';
    //             state.entries = action.payload;
    //         })
    //         .addCase(fetchEntriesByMonth.rejected, (state, action) => {
    //             state.status = 'failed';
    //             state.error = action.error.message;
    //         });
    // },
});

export default journalSlice.reducer;
