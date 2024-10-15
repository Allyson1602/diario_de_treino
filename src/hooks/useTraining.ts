import { IStorageData } from "../interfaces/storageData";
import { TrainingModel } from "../models/training.model";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setTraining } from "../redux/slices/trainingSlice";
import trainingStorage from "../storages/training.storage";

interface IUseTraining extends IStorageData<TrainingModel[]> {
  trainingActive: TrainingModel | null;
  setTrainingActive: (newExercise: TrainingModel | null) => void;
}

export const useTraining = (): IUseTraining => {
  const trainingData = useAppSelector((state) => state.training.value);
  const dispatch = useAppDispatch();

  const setTrainingActive = (newTraining: TrainingModel | null) => {
    dispatch(setTraining(newTraining));
  };

  return {
    getData: trainingStorage.getData,
    setData: trainingStorage.setData,
    updateData: trainingStorage.updateData,
    setTrainingActive,
    trainingActive: trainingData,
  };
};
