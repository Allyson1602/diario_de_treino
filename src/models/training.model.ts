import { ExerciseModel } from "./exercise.model";

export interface TrainingModel {
  id: string;
  name: string;
  exercises: ExerciseModel[];
  lastTraining: string;
  createdDate: string;
}
