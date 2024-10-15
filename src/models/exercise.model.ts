export interface ExerciseModel {
  id: number;
  name: string;
  anotation?: string;
  repetitions?: number;
  weight?: number;
  timer?: string;
  muscles: string[];
}
