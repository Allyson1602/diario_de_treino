export interface ExerciseModel {
  id: string;
  name: string;
  annotation?: string;
  repetitions?: number;
  weight?: string;
  timer?: string;
  muscles: string[];
  createdDate: string;
}
