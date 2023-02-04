import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@app/store';

interface DashboardState {
  jobListPanel: {
    activeJobList?: number;
  };
}

const initialState: DashboardState = {
  jobListPanel: {},
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    /** use custom useActiveJobList hook instead */
    setActiveJobList: (state, action: PayloadAction<number>) => {
      state.jobListPanel.activeJobList = action.payload;
    },
  },
});

export const { setActiveJobList } = dashboardSlice.actions;
export const selectDashboard = (state: RootState) => state.dashboard;
export const dashboardReducer = dashboardSlice.reducer;
