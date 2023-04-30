import { jobListReducer } from '@app/dashboard/job-list/job-list.slice';
import { toastReducer } from '@app/dashboard/toast/toast.slice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    toast: toastReducer,
    jobList: jobListReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;