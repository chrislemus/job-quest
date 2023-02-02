import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@app/store';

type Toast = {
  message: string;
  type: 'error' | 'warning' | 'info' | 'success';
};

// Define a type for the slice state
interface ToastState {
  toasts: Toast[];
  currentToast?: Toast;
}

// Define the initial state using that type
const initialState: ToastState = {
  toasts: [],
};

const toastSlice = createSlice({
  name: 'toast',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    enqueueToast: (state, action: PayloadAction<Toast>) => {
      if (state.currentToast) {
        state.toasts.push(action.payload);
      } else {
        state.currentToast = action.payload;
      }
    },
    currentToastDone: (state) => {
      state.currentToast = state.toasts.shift();
    },
  },
});

export const { enqueueToast, currentToastDone } = toastSlice.actions;
export const selectToast = (state: RootState) => state.toast;
export const toastReducer = toastSlice.reducer;
