import { MuscleModel } from "./muscle.model";

export interface ExerciseModel {
  anotation: string;
  repetitions: number;
  weight: number;
  timer: string;
  muscles: MuscleModel[];
}
