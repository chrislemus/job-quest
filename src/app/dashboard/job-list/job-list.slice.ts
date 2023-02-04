import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@app/dashboard/store';
import { useActiveJobList } from '@app/dashboard/job-list/hooks';

interface JobListState {
  activeJobList?: number;
}

const initialState: JobListState = {};

const jobListSlice = createSlice({
  name: 'jobList',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    /** use {@link useActiveJobList} hook instead */
    setActiveJobList: (state, action: PayloadAction<number>) => {
      state.activeJobList = action.payload;
    },
  },
});

export const { setActiveJobList } = jobListSlice.actions;
export const selectJobList = (state: RootState) => state.jobList;
export const jobListReducer = jobListSlice.reducer;
