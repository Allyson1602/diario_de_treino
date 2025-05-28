import { atom } from "recoil";
import { TrainingModel } from "../../models/training.model";

export const trainingActiveState = atom<TrainingModel | null>({
  key: "trainingActive",
  default: null,
});
