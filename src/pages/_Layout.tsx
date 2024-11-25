import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import { FunctionComponent, useState } from "react";
import Toast from "react-native-toast-message";
import { nativeBaseConfig, theme } from "../configs/themes/theme";
import { toastConfig } from "../configs/toast";
import { ExerciseModel } from "../models/exercise.model";
import { Navigation } from "../navigation";
import { ExerciseContext } from "../contexts/exercise.context";
import { WalkthroughContext, WalkthroughValueType } from "../contexts/walkthrough.context";
import { TrainingModel } from "../models/training.model";
import { TrainingContext } from "../contexts/training.context";

export const Layout: FunctionComponent = () => {
  const [currentTooltip, setCurrentTooltip] = useState<WalkthroughValueType>("");
  const [exerciseActive, setExerciseActive] = useState<ExerciseModel | null>(null);
  const [trainingActive, setTrainingActive] = useState<TrainingModel | null>(null);

  return (
    <>
      <StatusBar style="dark" animated translucent />

      <NativeBaseProvider theme={theme} config={nativeBaseConfig}>
        <TrainingContext.Provider
          value={{
            training: trainingActive,
            setTraining: setTrainingActive,
          }}
        >
          <ExerciseContext.Provider
            value={{
              exercise: exerciseActive,
              setExercise: setExerciseActive,
            }}
          >
            <WalkthroughContext.Provider
              value={{
                currentTooltip,
                setCurrentTooltip,
              }}
            >
              <Navigation />
            </WalkthroughContext.Provider>
          </ExerciseContext.Provider>
        </TrainingContext.Provider>
      </NativeBaseProvider>

      <Toast config={toastConfig} topOffset={16} />
    </>
  );
};
