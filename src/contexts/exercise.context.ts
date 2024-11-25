import { ExerciseModel } from "../models/exercise.model";
import { createContext } from "react";

interface ExerciseState {
  exercise: ExerciseModel | null;
  setExercise: (value: ExerciseModel | null) => void;
}

const exerciseDefaultValue: ExerciseState = {
  exercise: null,
  setExercise: (value: ExerciseModel | null) => {},
};

export const ExerciseContext = createContext(exerciseDefaultValue);
