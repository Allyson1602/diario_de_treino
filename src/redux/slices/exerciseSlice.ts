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
    setMusclesExercise: (state, action: PayloadAction<string[]>) => {
      if (state.value) {
        state.value.muscles = action.payload;
      }
    },
    setRepetitionsExercise: (state, action: PayloadAction<number | undefined>) => {
      if (state.value) {
        state.value.repetitions = action.payload;
      }
    },
    setWeightExercise: (state, action: PayloadAction<string>) => {
      if (state.value) {
        state.value.weight = action.payload;
      }
    },
    setAnnotationExercise: (state, action: PayloadAction<string>) => {
      if (state.value) {
        state.value.annotation = action.payload;
      }
    },
    setTimerExercise: (state, action: PayloadAction<string>) => {
      if (state.value) {
        state.value.timer = action.payload;
      }
    },
  },
});

export const {
  setExercise,
  setMusclesExercise,
  setRepetitionsExercise,
  setWeightExercise,
  setAnnotationExercise,
  setTimerExercise,
} = exerciseSlice.actions;

export default exerciseSlice.reducer;
