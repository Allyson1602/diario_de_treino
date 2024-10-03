import { MuscleModel } from "./muscle.model";

export interface ExerciseModel {
  id: number;
  anotation?: string;
  repetitions?: number;
  weight?: number;
  timer?: string;
  muscles?: MuscleModel[];
}
