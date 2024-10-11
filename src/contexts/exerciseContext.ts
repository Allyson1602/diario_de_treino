import { createContext } from "react";
import { ExerciseModel } from "../models/exercise.model";

export interface IExerciseContext {
  exerciseActive: ExerciseModel | undefined;
  setExerciseActive: (newExercise: ExerciseModel | undefined) => void;
}

export const ExerciseContext = createContext<IExerciseContext>({
  exerciseActive: undefined,
  setExerciseActive: () => {},
});
