export interface ExerciseModel {
  id: string;
  name: string;
  annotation?: string;
  repetitions?: number;
  weight?: number;
  timer?: string;
  muscles: string[];
  createdDate: string;
}
