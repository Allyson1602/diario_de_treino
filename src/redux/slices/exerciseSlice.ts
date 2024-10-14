import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ExerciseModel } from "../../models/exercise.model";

interface ExerciseState {
  value: ExerciseModel | null;
}

const initialState: ExerciseState = {
  value: null,
};

const exerciseSlice = createSlice({
  name: "exercise",
  initialState,
  reducers: {
    setExercise: (state, action: PayloadAction<ExerciseModel | null>) => {
      state.value = action.payload;
    },
  },
});

export const { setExercise } = exerciseSlice.actions;

export default exerciseSlice.reducer;
