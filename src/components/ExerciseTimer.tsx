import Ionicons from "@expo/vector-icons/Ionicons";
import moment from "moment";
import { IconButton, Input, useTheme, VStack } from "native-base";
import { FunctionComponent, useState } from "react";
import { ViewStyle } from "react-native";
import { TextInputMask } from "react-native-masked-text";

interface ExerciseTimerProps {
  onPress: () => void;
  containerStyle?: ViewStyle;
}

export const ExerciseTimer: FunctionComponent<ExerciseTimerProps> = (props) => {
  const theme = useTheme();

  const [toggleTimer, setToggleTimer] = useState(false);
  const [timerValue, setTimerValue] = useState("4:00");
  const [timerInterval, setTimerInterval] = useState<
    NodeJS.Timeout | undefined
  >();

  const startTimer = (): void => {
    let updateTimer = timerValue;

    const newInterval = setInterval(() => {
      if (timerInterval) return;

      const subtractTimer = moment(updateTimer, "m:ss").subtract(1, "seconds");

      updateTimer = subtractTimer.format("m:ss");
      console.log(updateTimer);
      setTimerValue(updateTimer);
    }, 1000);

    setTimerInterval(newInterval);
  };

  const stopTimer = () => {
    clearInterval(timerInterval);
    setTimerValue("4:00");
    setTimerInterval(undefined);
  };

  const handlePress = () => {
    const activatedTimer = !toggleTimer;

    setToggleTimer(activatedTimer);

    if (activatedTimer) {
      startTimer();
    } else {
      stopTimer();
    }

    props.onPress();
  };

  return (
    <VStack style={props.containerStyle}>
      <TextInputMask
        type={"datetime"}
        value={timerValue}
        options={{
          format: "m:ss",
        }}
        customTextInput={Input}
        customTextInputProps={{
          textAlign: "center",
          variant: "unstyled",
          size: "xl",
          color: "primary.500",
          fontWeight: "medium",
          pt: "0",
        }}
      />

      <IconButton
        onPress={handlePress}
        icon={
          <Ionicons
            name={!toggleTimer ? "play-outline" : "stop-outline"}
            size={64}
            color={theme.colors.white + "CC"}
          />
        }
        bgColor={"primary.500"}
        alignSelf={"center"}
        rounded={"full"}
      />
    </VStack>
  );
};
