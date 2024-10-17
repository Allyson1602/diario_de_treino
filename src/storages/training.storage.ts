import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { IStorageData } from "../interfaces/storageData";
import { TrainingModel } from "../models/training.model";
import { StorageKeys } from "./_storageKeys";

class TrainingStorage implements IStorageData<TrainingModel> {
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

      if (trainingsStringData) {
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

    return [];
  }

  private filterUpdatedTrainings(trainingsData: TrainingModel[], trainingValue: TrainingModel) {
    return trainingsData.map((trainingItem) => {
      if (trainingItem.id === trainingValue.id) {
        return trainingValue;
      }

      return trainingItem;
    });
  }

  async updateData(trainingValue: TrainingModel) {
    const trainingsData = await this.getData();

    if (trainingsData) {
      const updateTrainingsData: TrainingModel[] = this.filterUpdatedTrainings(
        trainingsData,
        trainingValue,
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

  async removeData(value: TrainingModel): Promise<boolean> {
    const trainingData = await this.getData();

    if (trainingData && trainingData.length > 0) {
      const trainingFiltered = trainingData.filter((item) => item.id !== value.id);

      const trainingJson = JSON.stringify(trainingFiltered);
      await AsyncStorage.setItem(StorageKeys.TRAINING, trainingJson);

      return true;
    }

    Toast.show({
      type: "error",
      text1: "Treino 💪",
      text2: "Opa! Não conseguimos remover o treino.",
    });

    return false;
  }
}

export default new TrainingStorage() as IStorageData<TrainingModel>;
