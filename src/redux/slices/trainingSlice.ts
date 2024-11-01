import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TrainingModel } from "../../models/training.model";
import { ExerciseModel } from "../../models/exercise.model";

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
    setExercise: (state, action: PayloadAction<ExerciseModel | null>) => {
      let trainingExercises = state.value?.exercises || [];

      if (trainingExercises.length > 0) {
        trainingExercises = trainingExercises.map((trainingExerciseItem) => {
          if (trainingExerciseItem.id === action.payload?.id) return action.payload;

          return trainingExerciseItem;
        });
      }

      if (state.value) {
        state.value = {
          ...state.value,
          exercises: trainingExercises,
        };
      }
    },
  },
});

export const { setTraining, setExercise } = trainingSlice.actions;

export default trainingSlice.reducer;
