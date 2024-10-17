import { ExerciseModel } from "../models/exercise.model";

export const getAllMuscleTraining = (exercises: ExerciseModel[]) => {
  return exercises.flatMap(({ muscles }) => muscles);
};
