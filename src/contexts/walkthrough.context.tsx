import { createContext } from "react";

export type WalkthroughValueType =
  | ""
  | "newTraining"
  | "trainingName"
  | "firstInfoExercise"
  | "secondInfoExercise"
  | "exerciseName"
  | "muscleGroup"
  | "repetitions"
  | "weight"
  | "timerValue"
  | "toggleTimer"
  | "exerciseNavigation"
  | "finished";

interface WalkthroughContextType {
  currentTooltip: WalkthroughValueType;
  setCurrentTooltip: (value: WalkthroughValueType) => void;
}

const walkthroughDefaultValue: WalkthroughContextType = {
  currentTooltip: "",
  setCurrentTooltip: (value: WalkthroughValueType) => {},
};

export const WalkthroughContext = createContext(walkthroughDefaultValue);
