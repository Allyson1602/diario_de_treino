import { atom } from "recoil";
import { ExerciseModel } from "../../models/exercise.model";

export const exerciseActiveState = atom<ExerciseModel | null>({
  key: "exerciseActive",
  default: null,
});
