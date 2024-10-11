import { useContext } from "react";
import { ExerciseContext, IExerciseContext } from "../contexts/exerciseContext";
import exerciseStorage from "../storages/exercise.storage";
import { ExerciseModel } from "../models/exercise.model";
import { IStorageData } from "../interfaces/storageData";

export const useExercise = (): IExerciseContext & IStorageData<ExerciseModel[]> => {
  const exerciseContext = useContext(ExerciseContext);

  const overwriteSetExerciseActive = (newExercise: ExerciseModel | undefined) => {
    exerciseContext.setExerciseActive(newExercise);

    if (newExercise) {
      exerciseStorage.updateData([newExercise]);
    }
  };

  return {
    ...exerciseContext,
    ...exerciseStorage,
    setExerciseActive: overwriteSetExerciseActive,
  };
};
