import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ExerciseModel } from "../../models/exercise.model";
import { TrainingModel } from "../../models/training.model";

interface TrainingState {
  value: TrainingModel | null;
}

const initialState: TrainingState = {
  value: null,
};

const trainingSlice = createSlice({
  name: "training",
  initialState,
  reducers: {
    setTraining: (state, action: PayloadAction<TrainingModel | null>) => {
      state.value = action.payload;
    },
    setExercise: (state, action: PayloadAction<ExerciseModel>) => {
      let trainingExercises = state.value?.exercises || [];

      const trainingExerciseIndex = trainingExercises.findIndex(
        (exerciseItem) => exerciseItem.id === action.payload.id,
      );

      trainingExercises[trainingExerciseIndex] = action.payload;

      if (state.value) {
        state.value.exercises = trainingExercises;
      }
    },
  },
});

export const { setTraining, setExercise } = trainingSlice.actions;

export default trainingSlice.reducer;
