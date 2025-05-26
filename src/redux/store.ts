import { configureStore } from '@reduxjs/toolkit';
import { bookingsApi } from '../api/bookingsApi';

import filterSlice from './filter/filterSlice';

export const store = configureStore({
  reducer: {
    filters: filterSlice,
    [bookingsApi.reducerPath]: bookingsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(bookingsApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
