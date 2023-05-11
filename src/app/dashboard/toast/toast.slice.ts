import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/app/dashboard/store';

export type ToastType = 'error' | 'warning' | 'info' | 'success';

type Toast = {
  message: string;
  type: ToastType;
};

interface ToastState {
  toasts: Toast[];
  currentToast?: Toast;
}

const initialState: ToastState = {
  toasts: [],
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    enqueueToast: (state, action: PayloadAction<Toast>) => {
      if (state.currentToast) {
        state.toasts.push(action.payload);
      } else {
        state.currentToast = action.payload;
      }
    },
    dequeueToast: (state) => {
      state.currentToast = state.toasts.shift();
    },
  },
});

export const { enqueueToast, dequeueToast } = toastSlice.actions;
export const selectToast = (state: RootState) => state.toast;
export const toastReducer = toastSlice.reducer;
