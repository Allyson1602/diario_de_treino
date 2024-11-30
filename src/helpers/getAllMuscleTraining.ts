import { ExerciseModel } from "../models/exercise.model";

export const getAllMuscleTraining = (exercises: ExerciseModel[]) => {
  const exercisesMuscles = exercises.flatMap(({ muscles }) => muscles);

  return [...new Set(exercisesMuscles)];
};
