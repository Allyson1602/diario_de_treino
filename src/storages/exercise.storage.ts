import AsyncStorage from "@react-native-async-storage/async-storage";
import { IStorageData } from "../interfaces/storageData";
import { ExerciseModel } from "../models/exercise.model";
import { StorageKeys } from "./_storageKeys";
import Toast from "react-native-toast-message";

class ExerciseStorage implements IStorageData<ExerciseModel> {
  async setData(exerciseValue: ExerciseModel): Promise<void> {
    try {
      const exerciseJson = JSON.stringify(exerciseValue);
      await AsyncStorage.setItem(StorageKeys.EXERCISE, exerciseJson);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Exercício 🏋️‍♂️",
        text2: "Eita! O exercício não quis entrar!",
      });
    }
  }

  async getData() {
    try {
      const exerciseStringData = await AsyncStorage.getItem(
        StorageKeys.EXERCISE
      );

      if (exerciseStringData !== null) {
        const exerciseJson: ExerciseModel = JSON.parse(exerciseStringData);

        return exerciseJson;
      }
    } catch (e) {
      Toast.show({
        type: "error",
        text1: "Exercício 🏋️‍♂️",
        text2: "Ih, o exercício sumiu!",
      });
    }

    return null;
  }

  async updateData(exerciseValue: ExerciseModel) {
    const exerciseData = await this.getData();

    if (exerciseData) {
      const updateExerciseData: ExerciseModel = {
        ...exerciseData,
        ...exerciseValue,
      };

      try {
        const exerciseJson = JSON.stringify(updateExerciseData);
        await AsyncStorage.setItem(StorageKeys.EXERCISE, exerciseJson);
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Exercício 🏋️‍♂️",
          text2: "Opa! Tivemos um probleminha ao atualizar.",
        });
      }
    }
  }
}

export default new ExerciseStorage();
