import Ionicons from "@expo/vector-icons/Ionicons";
import { useFocusEffect } from "@react-navigation/native";
import moment from "moment";
import { Box, Center, Input, Text, useTheme, VStack } from "native-base";
import { FunctionComponent, useCallback, useContext, useState } from "react";
import { Keyboard, ViewStyle } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import { SharedValue, useSharedValue, withTiming } from "react-native-reanimated";
import Tooltip from "react-native-walkthrough-tooltip";
import { WalkthroughContext } from "../redux/walkthrough.context";
import { CustomAnimated } from "./ui/CustomAnimated";

const MIN_TIMER_VALUE = "0:00";
const MAX_SECONDS = 59;

interface ExerciseTimerProps {
  onChangeTimerValue: (text: string) => void;
  onPressTimer?: (status: "paused" | "running") => void;
  onTimerEnd?: () => void;
  containerStyle?: ViewStyle;
  timerValue: string;
}

export const ExerciseTimer: FunctionComponent<ExerciseTimerProps> = (props) => {
  const theme = useTheme();
  const scaleTimer = useSharedValue(1);
  const scaleRestart = useSharedValue(1);
  const { currentTooltip, setCurrentTooltip } = useContext(WalkthroughContext);

  const [toggleTimer, setToggleTimer] = useState(false);
  const [timerValue, setTimerValue] = useState(props.timerValue);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | undefined>();

  const defineAnimationOnPress = (scale: SharedValue<number>) => {
    scale.value = withTiming(0.9, { duration: 100 }, () => {
      scale.value = withTiming(1);
    });
  };

  const startTimer = (): void => {
    let updateTimer = timerValue;
    setToggleTimer(true);

    const startDate = moment().add(1, "second");

    if (timerInterval) clearInterval(timerInterval);

    const newInterval = setInterval(() => {
      if (timerInterval) return;

      const elapsedTime = moment().diff(startDate, "milliseconds");
      const remainingTime = moment.duration(
        moment(updateTimer, "m:ss").diff(elapsedTime, "milliseconds"),
      );

      const formattedTime = moment.utc(remainingTime.asMilliseconds()).format("m:ss");
      setTimerValue(formattedTime);
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

    const timerStatus = toggleTimer ? "paused" : "running";
    props.onPressTimer?.(timerStatus);
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
    }, [timerValue]),
  );

  useFocusEffect(
    useCallback(() => {
      setTimerValue(props.timerValue);
    }, [props.timerValue]),
  );

  return (
    <VStack style={props.containerStyle}>
      <Tooltip
        isVisible={currentTooltip === "timerValue"}
        content={
          <Box>
            <Text>Defina o tempo de descanso</Text>
          </Box>
        }
        onClose={() => setCurrentTooltip("toggleTimer")}
        placement="bottom"
        topAdjustment={-24}
      >
        <TextInputMask
          type={"datetime"}
          value={timerValue}
          onChangeText={currentTooltip === "timerValue" ? undefined : handleChangeTimerValue}
          readOnly={toggleTimer}
          selectTextOnFocus
          options={{
            format: "m:ss",
          }}
          customTextInput={Input}
          customTextInputProps={{
            width: "100",
            mx: "auto",
            bgColor: currentTooltip === "timerValue" ? "white:alpha.80" : "transparent",
            borderRadius: currentTooltip === "timerValue" ? "2xl" : "none",

            textAlign: "center",
            variant: "unstyled",
            size: "xl",
            color: "primary.500",
            fontWeight: "medium",
            py: "0",
            height: 8,
            maxHeight: 8,
            selectionColor: theme.colors.blue[400],
            _focus: {
              _android: {
                selectionColor: theme.colors.blue[400],
              },
            },
          }}
        />
      </Tooltip>

      <Tooltip
        isVisible={currentTooltip === "toggleTimer"}
        content={
          <Box>
            <Text>Inicie, pauso ou reinicie o tempo de descanso</Text>
          </Box>
        }
        onClose={() => setCurrentTooltip("exerciseNavigation")}
        placement="top"
        topAdjustment={-24}
      >
        <Center position={"relative"}>
          <CustomAnimated.IconButton
            onPress={currentTooltip === "toggleTimer" ? undefined : handlePressTimer}
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
      </Tooltip>
    </VStack>
  );
};
