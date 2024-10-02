import AsyncStorage from "@react-native-async-storage/async-storage";
import { IStorageData } from "../interfaces/storageData";
import { ExerciseModel } from "../models/exercise.model";
import { StorageKeys } from "./_storageKeys";

class ExerciseStorage implements IStorageData<ExerciseModel> {
  async setData(exerciseValue: ExerciseModel): Promise<void> {
    try {
      const exerciseJson = JSON.stringify(exerciseValue);
      await AsyncStorage.setItem(StorageKeys.EXERCISE, exerciseJson);
    } catch (error) {
      // saving error
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
      // error reading value
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
        // saving error
      }
    }
  }
}

export default new ExerciseStorage();
