import Ionicons from "@expo/vector-icons/Ionicons";
import { useFocusEffect } from "@react-navigation/native";
import moment from "moment";
import { Center, Input, useTheme, VStack } from "native-base";
import { FunctionComponent, useCallback, useState } from "react";
import { Keyboard, ViewStyle } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import {
  SharedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { CustomAnimated } from "./ui/CustomAnimated";

const MIN_TIMER_VALUE = "0:00";
const MAX_SECONDS = 59;

interface ExerciseTimerProps {
  onChangeTimerValue: (text: string) => void;
  onPressTimer: () => void;
  onTimerEnd?: () => void;
  containerStyle?: ViewStyle;
  timerValue: string;
}

export const ExerciseTimer: FunctionComponent<ExerciseTimerProps> = (props) => {
  const theme = useTheme();
  const scaleTimer = useSharedValue(1);
  const scaleRestart = useSharedValue(1);

  const [toggleTimer, setToggleTimer] = useState(false);
  const [timerValue, setTimerValue] = useState(props.timerValue);
  const [timerInterval, setTimerInterval] = useState<
    NodeJS.Timeout | undefined
  >();

  const defineAnimationOnPress = (scale: SharedValue<number>) => {
    scale.value = withTiming(0.9, { duration: 100 }, () => {
      scale.value = withTiming(1);
    });
  };

  const startTimer = (): void => {
    let updateTimer = timerValue;
    setToggleTimer(true);

    const newInterval = setInterval(() => {
      if (timerInterval) return;

      const subtractTimer = moment(updateTimer, "m:ss").subtract(1, "seconds");

      updateTimer = subtractTimer.format("m:ss");
      setTimerValue(updateTimer);
    }, 1000);

    setTimerInterval(newInterval);
  };

  const restartTimer = () => {
    setTimerValue(props.timerValue);
  };

  const stopTimer = () => {
    clearInterval(timerInterval);
    setTimerInterval(undefined);
    setToggleTimer(false);
  };

  const defineTimer = () => {
    if (!toggleTimer) {
      startTimer();
    } else {
      stopTimer();
    }
  };

  const handlePressTimer = () => {
    defineAnimationOnPress(scaleTimer);

    defineTimer();

    props.onPressTimer();
  };

  const handlePressRestart = () => {
    defineAnimationOnPress(scaleRestart);

    stopTimer();
    restartTimer();
  };

  const handleChangeTimerValue = (text: string) => {
    const splitTimer: string[] = text.split(":");

    const isValidSeconds = Number(splitTimer[1]) <= MAX_SECONDS ? true : false;

    if (isValidSeconds === false && text.length === 4) {
      props.onChangeTimerValue(`${splitTimer[0]}:${MAX_SECONDS}`);
      return;
    }

    props.onChangeTimerValue(text);

    if (text.length === 4) {
      Keyboard.dismiss();
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (timerValue === MIN_TIMER_VALUE) {
        stopTimer();
        setToggleTimer(false);
        setTimerValue(props.timerValue);

        props.onTimerEnd?.();
      }
    }, [timerValue])
  );

  useFocusEffect(
    useCallback(() => {
      setTimerValue(props.timerValue);
    }, [props.timerValue])
  );

  return (
    <VStack style={props.containerStyle}>
      <TextInputMask
        type={"datetime"}
        value={timerValue}
        onChangeText={handleChangeTimerValue}
        readOnly={toggleTimer}
        selectTextOnFocus
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
          py: "0",
        }}
      />

      <Center position={"relative"}>
        <CustomAnimated.IconButton
          onPress={handlePressTimer}
          icon={
            <Ionicons
              name={toggleTimer ? "stop-outline" : "play-outline"}
              size={64}
              color={theme.colors.white + "CC"}
            />
          }
          bgColor={"primary.500"}
          alignSelf={"center"}
          rounded={"full"}
          style={{ transform: [{ scale: scaleTimer }] }}
        />

        <CustomAnimated.IconButton
          onPress={handlePressRestart}
          icon={
            <Ionicons
              name="reload"
              size={24}
              color={theme.colors.white + "CC"}
              style={{
                transform: [{ rotateY: "180deg" }],
              }}
            />
          }
          size={"xs"}
          position={"absolute"}
          bottom={-24}
          bgColor={"primary.300"}
          alignSelf={"center"}
          rounded={"full"}
          style={{ transform: [{ scale: scaleRestart }] }}
        />
      </Center>
    </VStack>
  );
};
