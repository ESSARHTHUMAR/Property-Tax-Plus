import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "./features/calenderSlice";
import { localStorageMiddleware } from "./middleware/localStorageMiddleware";

export const store = configureStore({
  reducer: {
    calendar: calendarReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
