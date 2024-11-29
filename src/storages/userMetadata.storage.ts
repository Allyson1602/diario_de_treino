import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { StorageKeys } from "./_storageKeys";

interface IUserMetadataStorage {
  toggleTutorialWorkout(): void;
  getTutorialWorkout(): Promise<boolean | undefined>;
  toggleTutorialHome(): void;
  getTutorialHome(): Promise<boolean | undefined>;
  toggleTutorialTraining(): void;
  getTutorialTraining(): Promise<boolean | undefined>;
}

class UserMetadataStorage implements IUserMetadataStorage {
  async toggleTutorialWorkout() {
    const isTutorialCompleted = await this.getTutorialWorkout();

    try {
      const isTutorialCompletedJson = JSON.stringify(isTutorialCompleted || true);
      await AsyncStorage.setItem(
        StorageKeys.USER_METADATA_TUTORIAL_WORKOUT,
        isTutorialCompletedJson,
      );
      console.log("fechado", isTutorialCompletedJson);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Erro com o tutorial do exercício",
      });
    }
  }

  async getTutorialWorkout(): Promise<boolean | undefined> {
    try {
      const isTutorialCompletedStringData = await AsyncStorage.getItem(
        StorageKeys.USER_METADATA_TUTORIAL_WORKOUT,
      );

      if (isTutorialCompletedStringData) {
        const isTutorialCompletedJson: boolean = JSON.parse(isTutorialCompletedStringData);

        return isTutorialCompletedJson;
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Erro com o tutorial do exercício",
      });
    }
  }
  async toggleTutorialHome() {
    const isTutorialCompleted = await this.getTutorialHome();

    try {
      const isTutorialCompletedJson = JSON.stringify(isTutorialCompleted || true);
      await AsyncStorage.setItem(StorageKeys.USER_METADATA_TUTORIAL_HOME, isTutorialCompletedJson);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Erro com o tutorial do treino",
      });
    }
  }

  async getTutorialHome(): Promise<boolean | undefined> {
    try {
      const isTutorialCompletedStringData = await AsyncStorage.getItem(
        StorageKeys.USER_METADATA_TUTORIAL_HOME,
      );

      if (isTutorialCompletedStringData) {
        const isTutorialCompletedJson: boolean = JSON.parse(isTutorialCompletedStringData);

        return isTutorialCompletedJson;
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Erro com o tutorial do treino",
      });
    }
  }
  async toggleTutorialTraining() {
    const isTutorialCompleted = await this.getTutorialTraining();

    try {
      const isTutorialCompletedJson = JSON.stringify(isTutorialCompleted || true);
      await AsyncStorage.setItem(
        StorageKeys.USER_METADATA_TUTORIAL_TRAINING,
        isTutorialCompletedJson,
      );
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Erro com o tutorial do treino",
      });
    }
  }

  async getTutorialTraining(): Promise<boolean | undefined> {
    try {
      const isTutorialCompletedStringData = await AsyncStorage.getItem(
        StorageKeys.USER_METADATA_TUTORIAL_TRAINING,
      );

      if (isTutorialCompletedStringData) {
        const isTutorialCompletedJson: boolean = JSON.parse(isTutorialCompletedStringData);

        return isTutorialCompletedJson;
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Erro com o tutorial do treino",
      });
    }
  }
}

export default new UserMetadataStorage();
