import AsyncStorage from "@react-native-async-storage/async-storage";
import { IStorageData } from "../interfaces/storageData";
import { ExerciseModel } from "../models/exercise.model";
import { StorageKeys } from "./_storageKeys";
import Toast from "react-native-toast-message";

class ExerciseStorage implements IStorageData<ExerciseModel[]> {
  async setData(exercisesValue: ExerciseModel[]): Promise<void> {
    try {
      const exercisesJson = JSON.stringify(exercisesValue);
      await AsyncStorage.setItem(StorageKeys.EXERCISE, exercisesJson);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Exercício 🏋️‍♂️",
        text2: "Eita! O(s) exercício(s) não quis(eram) entrar!",
      });
    }
  }

  async getData() {
    try {
      const exercisesStringData = await AsyncStorage.getItem(
        StorageKeys.EXERCISE
      );

      if (exercisesStringData !== null) {
        const exercisesJson: ExerciseModel[] = JSON.parse(exercisesStringData);

        return exercisesJson;
      }
    } catch (e) {
      Toast.show({
        type: "error",
        text1: "Exercício 🏋️‍♂️",
        text2: "Ih, o(s) exercício(s) sumiu(ram)!",
      });
    }

    return null;
  }

  private filterUpdatedExercises(
    exercisesData: ExerciseModel[],
    exercisesValue: ExerciseModel[]
  ) {
    return exercisesData.map((exerciseItem) => {
      const exerciseUpdated = exercisesValue.find(
        (exerciseValue) => exerciseValue.id === exerciseItem.id
      );

      if (exerciseUpdated) {
        return exerciseUpdated;
      }

      return exerciseItem;
    });
  }

  async updateData(exercisesValue: ExerciseModel[]) {
    const exercisesData = await this.getData();

    if (exercisesData) {
      const updateExercisesData: ExerciseModel[] = this.filterUpdatedExercises(
        exercisesData,
        exercisesValue
      );

      try {
        const exerciseJson = JSON.stringify(updateExercisesData);
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
