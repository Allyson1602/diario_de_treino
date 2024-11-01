import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Crypto from "expo-crypto";
import moment from "moment";
import Toast from "react-native-toast-message";
import { generateOrderAlphabetName } from "../helpers/generateOrderAlphabetName";
import { IStorageData } from "../interfaces/storageData";
import { ExerciseModel } from "../models/exercise.model";
import { TrainingModel } from "../models/training.model";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setExercise } from "../redux/slices/exerciseSlice";
import { setTraining } from "../redux/slices/trainingSlice";
import { StorageKeys } from "../storages/_storageKeys";
import trainingStorage from "../storages/training.storage";

interface IUseTraining extends IStorageData<TrainingModel> {
  exerciseActive: ExerciseModel | null;
  setExerciseActive: (newExercise: ExerciseModel | null) => void;
  trainingActive: TrainingModel | null;
  setTrainingActive: (newExercise: TrainingModel | null) => void;
  removeExercise: (exerciseRemove: ExerciseModel) => Promise<boolean>;
  createExercise: () => ExerciseModel;
  createTraining: () => Promise<TrainingModel>;
}

export const useTraining = (): IUseTraining => {
  const exerciseData = useAppSelector((state) => state.exercise.value);
  const trainingData = useAppSelector((state) => state.training.value);
  const dispatch = useAppDispatch();

  const getMoreRecentExercise = (): ExerciseModel | null => {
    if (trainingData) {
      let lastExercise: ExerciseModel | null = null;

      trainingData.exercises.forEach((item, index) => {
        const exerciseDate = moment(item.createdDate);
        const exerciseBeforeDate = moment(trainingData.exercises[index].createdDate);

        if (moment.max(exerciseDate, exerciseBeforeDate) !== exerciseDate) {
          lastExercise = trainingData.exercises[index];
          return;
        }

        lastExercise = item;
      });

      return lastExercise;
    }

    return null;
  };

  const getMoreRecentTraining = async (): Promise<TrainingModel | null> => {
    const trainingsStorage = await trainingStorage.getData();

    if (trainingsStorage) {
      let lastTraining: TrainingModel | null = null;

      trainingsStorage.forEach((item, index) => {
        const trainingDate = moment(item.createdDate);
        const trainingBeforeDate = moment(trainingsStorage[index].createdDate);

        if (moment.max(trainingDate, trainingBeforeDate) !== trainingDate) {
          lastTraining = trainingsStorage[index];
          return;
        }

        lastTraining = item;
      });

      return lastTraining;
    }

    return null;
  };

  const generateExerciseName = (): string => {
    const recentExercise = getMoreRecentExercise();
    const recentExerciseNameSplit = recentExercise?.name.split(" ");

    const newName = recentExercise?.name
      ? "Exercício" + (" " + recentExerciseNameSplit?.[recentExerciseNameSplit.length - 1])
      : "Exercício";

    return generateOrderAlphabetName(newName);
  };

  const generateTrainingName = async (): Promise<string> => {
    const recentTraining = await getMoreRecentTraining();
    const recentTrainingNameSplit = recentTraining?.name.split(" ");

    const newName = recentTraining?.name
      ? "Treino" + (" " + recentTrainingNameSplit?.[recentTrainingNameSplit.length - 1])
      : "Treino";

    return generateOrderAlphabetName(newName);
  };

  const createTraining = async (): Promise<TrainingModel> => {
    const trainingUuid = Crypto.randomUUID();

    const newTraining: TrainingModel = {
      id: trainingUuid,
      name: await generateTrainingName(),
      exercises: [],
      createdDate: moment().format(),
      lastTraining: moment().format(),
    };

    return newTraining;
  };

  const createExercise = (): ExerciseModel => {
    const exerciseUuid = Crypto.randomUUID();

    return {
      id: exerciseUuid,
      name: generateExerciseName(),
      muscles: [],
      createdDate: moment().format(),
    };
  };

  const setTrainingActive = (newTraining: TrainingModel | null) => {
    dispatch(setTraining(newTraining));
  };

  const setExerciseActive = (newExercise: ExerciseModel | null) => {
    dispatch(setExercise(newExercise));
  };

  const removeExercise = async (exerciseRemove: ExerciseModel) => {
    const exercisesData = trainingData?.exercises;

    if (exercisesData && exercisesData.length > 0) {
      const exercisesFiltered = exercisesData.filter((item) => item.id !== exerciseRemove.id);

      const trainingActive: TrainingModel = {
        ...trainingData,
        exercises: exercisesFiltered,
      };

      setTrainingActive(trainingActive);

      const trainingsStorage = await trainingStorage.getData();
      const trainingsUpdated: TrainingModel[] = trainingsStorage.map((trainingItem) => {
        if (trainingItem.id === trainingActive.id) {
          return trainingActive;
        }

        return trainingItem;
      });

      const trainingsJson = JSON.stringify(trainingsUpdated);
      await AsyncStorage.setItem(StorageKeys.TRAINING, trainingsJson);

      return true;
    }

    Toast.show({
      type: "error",
      text1: "Exercício 🏋️‍♂️",
      text2: "Opa! Não conseguimos remover o exercício.",
    });

    return false;
  };

  return {
    getData: trainingStorage.getData,
    setData: trainingStorage.setData,
    updateData: trainingStorage.updateData,
    removeData: trainingStorage.removeData,

    createTraining,
    createExercise,
    removeExercise,

    trainingActive: trainingData,
    setTrainingActive,

    exerciseActive: exerciseData,
    setExerciseActive,
  };
};
