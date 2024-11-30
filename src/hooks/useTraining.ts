import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Crypto from "expo-crypto";
import moment from "moment";
import Toast from "react-native-toast-message";
import { generateOrderAlphabetName } from "../helpers/generateOrderAlphabetName";
import { mostDefinedValueRepetitions } from "../helpers/mostDefinedValueRepetitions";
import { mostDefinedValueTimer } from "../helpers/mostDefinedValueTimer";
import { IStorageData } from "../interfaces/storageData";
import { ExerciseModel } from "../models/exercise.model";
import { TrainingModel } from "../models/training.model";
import { StorageKeys } from "../storages/_storageKeys";
import trainingStorage from "../storages/training.storage";
import { useRecoilState } from "recoil";
import { trainingActiveState } from "../contexts/recoil/trainingActiveState";

interface IUseTraining extends IStorageData<TrainingModel> {
  removeExercise: (exerciseRemove: ExerciseModel) => Promise<boolean>;
  createExercise: () => Promise<ExerciseModel>;
  createTraining: () => Promise<TrainingModel>;
}

export const useTraining = (): IUseTraining => {
  const [trainingActive, setTrainingActive] = useRecoilState(trainingActiveState);

  const getMoreRecentExercise = (): ExerciseModel | null => {
    if (trainingActive) {
      let lastExercise: ExerciseModel | null = null;

      trainingActive.exercises.forEach((item, index) => {
        const exerciseDate = moment(item.createdDate);
        const exerciseBeforeDate = moment(trainingActive.exercises[index].createdDate);

        if (moment.max(exerciseDate, exerciseBeforeDate) !== exerciseDate) {
          lastExercise = trainingActive.exercises[index];
          return;
        }

        lastExercise = item;
      });

      return lastExercise;
    }

    return null;
  };

  const getMoreRecentTraining = async (): Promise<TrainingModel | null> => {
    const trainingsStorage = await trainingStorage.getStorageData();

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

  const createExercise = async (): Promise<ExerciseModel> => {
    const trainingsStorage = await trainingStorage.getStorageData();
    const exerciseUuid = Crypto.randomUUID();
    const mostUsedTimer = mostDefinedValueTimer(trainingsStorage);
    const mostUsedRepetitions = mostDefinedValueRepetitions(trainingsStorage);

    return {
      id: exerciseUuid,
      name: generateExerciseName(),
      muscles: [],
      timer: mostUsedTimer,
      repetitions: mostUsedRepetitions,
      createdDate: moment().format(),
    };
  };

  const removeExercise = async (exerciseRemove: ExerciseModel) => {
    const exercisesData = trainingActive?.exercises;

    if (exercisesData && exercisesData.length > 0) {
      const exercisesFiltered = exercisesData.filter((item) => item.id !== exerciseRemove.id);

      const trainingRemove: TrainingModel = {
        ...trainingActive,
        exercises: exercisesFiltered,
      };

      setTrainingActive(trainingRemove);

      const trainingsStorage = await trainingStorage.getStorageData();
      const trainingsUpdated: TrainingModel[] = trainingsStorage.map((trainingItem) => {
        if (trainingItem.id === trainingRemove.id) {
          return trainingRemove;
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
    getStorageData: trainingStorage.getStorageData,
    setStorageData: trainingStorage.setStorageData,
    updateStorageData: trainingStorage.updateStorageData,
    removeStorageData: trainingStorage.removeStorageData,

    createTraining,
    createExercise,
    removeExercise,
  };
};
