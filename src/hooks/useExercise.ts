import { IStorageData } from "../interfaces/storageData";
import { ExerciseModel } from "../models/exercise.model";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setExercise } from "../redux/slices/exerciseSlice";
import exerciseStorage from "../storages/exercise.storage";

interface IUseExercise extends IStorageData<ExerciseModel[]> {
  exerciseActive: ExerciseModel | null;
  setExerciseActive: (newExercise: ExerciseModel | null) => void;
}

export const useExercise = (): IUseExercise => {
  const exerciseData = useAppSelector((state) => state.exercise.value);
  const dispatch = useAppDispatch();

  const overwriteSetExerciseActive = (newExercise: ExerciseModel | null) => {
    dispatch(setExercise(newExercise));

    if (newExercise) {
      exerciseStorage.updateData([newExercise]);
    }
  };

  return {
    getData: exerciseStorage.getData,
    setData: exerciseStorage.setData,
    updateData: exerciseStorage.updateData,
    exerciseActive: exerciseData,
    setExerciseActive: overwriteSetExerciseActive,
  };
};
