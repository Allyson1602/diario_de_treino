import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
  },
});

export const { setTraining } = trainingSlice.actions;

export default trainingSlice.reducer;
