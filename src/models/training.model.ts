import { ExerciseModel } from "./exercise.model";

export interface TrainingModel {
  id: number;
  name: string;
  lastTraining: string;
  exercises: ExerciseModel[];
}
