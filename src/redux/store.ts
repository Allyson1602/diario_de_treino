import { configureStore } from "@reduxjs/toolkit";
import exerciseReducer from "./slices/exerciseSlice";
import trainingReducer from "./slices/trainingSlice";

export const store = configureStore({
  reducer: {
    exercise: exerciseReducer,
    training: trainingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
