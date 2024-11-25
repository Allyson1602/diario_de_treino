import { createContext } from "react";
import { TrainingModel } from "../models/training.model";

interface TrainingState {
  training: TrainingModel | null;
  setTraining: (value: TrainingModel | null) => void;
}

const trainingDefaultValue: TrainingState = {
  training: null,
  setTraining: (value: TrainingModel | null) => {},
};

export const TrainingContext = createContext(trainingDefaultValue);
