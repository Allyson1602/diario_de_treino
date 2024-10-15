import AsyncStorage from "@react-native-async-storage/async-storage";
import { IStorageData } from "../interfaces/storageData";
import { StorageKeys } from "./_storageKeys";
import Toast from "react-native-toast-message";
import { TrainingModel } from "../models/training.model";

class TrainingStorage implements IStorageData<TrainingModel[]> {
  async setData(trainingsValue: TrainingModel[]): Promise<void> {
    try {
      const trainingsJson = JSON.stringify(trainingsValue);
      await AsyncStorage.setItem(StorageKeys.TRAINING, trainingsJson);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Treino 💪",
        text2: "Eita! O(s) treino(s) não quis(eram) entrar!",
      });
    }
  }

  async getData() {
    try {
      const trainingsStringData = await AsyncStorage.getItem(StorageKeys.TRAINING);

      if (trainingsStringData !== null) {
        const trainingsJson: TrainingModel[] = JSON.parse(trainingsStringData);

        return trainingsJson;
      }
    } catch (e) {
      Toast.show({
        type: "error",
        text1: "Treino 💪",
        text2: "Ih, o(s) treino(s) sumiu(ram)!",
      });
    }

    return null;
  }

  private filterUpdatedTrainings(trainingsData: TrainingModel[], trainingsValue: TrainingModel[]) {
    return trainingsData.map((trainingItem) => {
      const trainingUpdated = trainingsValue.find(
        (trainingValue) => trainingValue.id === trainingItem.id,
      );

      if (trainingUpdated) {
        return trainingUpdated;
      }

      return trainingItem;
    });
  }

  async updateData(trainingsValue: TrainingModel[]) {
    const trainingsData = await this.getData();

    if (trainingsData) {
      const updateTrainingsData: TrainingModel[] = this.filterUpdatedTrainings(
        trainingsData,
        trainingsValue,
      );

      try {
        const trainingJson = JSON.stringify(updateTrainingsData);
        await AsyncStorage.setItem(StorageKeys.TRAINING, trainingJson);
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Treino 💪",
          text2: "Opa! Tivemos um probleminha ao atualizar.",
        });
      }
    }
  }
}

export default new TrainingStorage() as IStorageData<TrainingModel[]>;
