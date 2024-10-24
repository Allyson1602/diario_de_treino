import { ExerciseModel } from "./exercise.model";

export interface TrainingModel {
  id: string;
  name: string;
  exercises: ExerciseModel[];
  createdDate: string;
}
