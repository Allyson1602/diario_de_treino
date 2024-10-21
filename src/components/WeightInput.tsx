import { HStack, Input, useTheme } from "native-base";
import { FunctionComponent } from "react";
import { Keyboard } from "react-native";
import { cancelAnimation, SharedValue, useSharedValue, withTiming } from "react-native-reanimated";
import { convertPointToWasp } from "../utils/convertPointToWasp";
import { convertWaspToPoint } from "../utils/convertWaspToPoint";
import { CustomAnimated } from "./ui/CustomAnimated";

const MAX_INPUT_VALUE = 999.99;
const MIN_INPUT_VALUE = 0;
const STEP_VALUE = 2.5;

interface WeightInputProps {
  onPressPlus: (newValue: string) => void;
  onPressLess: (newValue: string) => void;
  onChangeInput: (value: string) => void;
  value: string;
}

export const WeightInput: FunctionComponent<WeightInputProps> = (props) => {
  const theme = useTheme();
  const scaleLess = useSharedValue(1);
  const scalePlus = useSharedValue(1);

  const onlyTwoDecimals = (value: string) => {
    const numberSplit = value.split(".");

    if (numberSplit.length === 2) {
      return numberSplit[0] + "." + numberSplit[1].slice(0, 2);
    }

    return value;
  };

  const defineAnimationOnPress = (scale: SharedValue<number>) => {
    cancelAnimation(scale);

    scale.value = withTiming(0.8, { duration: 100 }, () => {
      scale.value = withTiming(1, { duration: 100 });
    });
  };

  const handlePressLess = () => {
    defineAnimationOnPress(scaleLess);
    Keyboard.dismiss();

    const weightNumber = parseFloat(convertWaspToPoint(props.value));

    if (weightNumber >= MIN_INPUT_VALUE) {
      const subWeight = weightNumber < STEP_VALUE ? 0 : weightNumber - STEP_VALUE;

      let weightString = String(subWeight);
      weightString = convertPointToWasp(weightString);

      props.onPressLess(weightString);
    }
  };

  const handlePressPlus = () => {
    defineAnimationOnPress(scalePlus);
    Keyboard.dismiss();

    const weightNumber = parseFloat(convertWaspToPoint(props.value) || "0");

    if (weightNumber <= MAX_INPUT_VALUE) {
      const sumWeight =
        weightNumber > MAX_INPUT_VALUE - STEP_VALUE ? MAX_INPUT_VALUE : weightNumber + STEP_VALUE;

      let weightString = String(sumWeight);
      weightString = convertPointToWasp(weightString);

      props.onPressPlus(weightString);
    }
  };

  const handleChangeWeight = (text: string) => {
    let weightText = convertWaspToPoint(text);
    weightText = weightText.replace("-", "");
    weightText = onlyTwoDecimals(weightText);
    let weightNumber = parseFloat(weightText);

    if (
      (!isNaN(weightNumber) &&
        weightNumber >= MIN_INPUT_VALUE &&
        weightNumber <= MAX_INPUT_VALUE) ||
      weightText === ""
    ) {
      const weightString = convertPointToWasp(weightText);
      props.onChangeInput(weightString);
      return;
    }
  };

  return (
    <HStack justifyContent={"center"} alignItems={"center"} space={"4"}>
      <CustomAnimated.Button
        size={"lg"}
        onPress={handlePressLess}
        isDisabled={Number(props.value) <= MIN_INPUT_VALUE}
        _text={{
          color: "text.700",
          fontSize: "lg",
        }}
        variant={"unstyled"}
        style={{ transform: [{ scale: scaleLess }] }}
      >
        -2,5kg
      </CustomAnimated.Button>

      <Input
        inputMode={"numeric"}
        caretHidden
        selectTextOnFocus
        selectionColor={theme.colors.blue[400]}
        borderWidth={1}
        rounded={"full"}
        textAlign={"center"}
        size={"lg"}
        width={"32"}
        height={"12"}
        value={convertPointToWasp(props.value)}
        placeholder="0"
        onChangeText={handleChangeWeight}
        fontSize={"2xl"}
        _focus={{
          borderColor: "primary.500",
          _android: {
            selectionColor: theme.colors.blue[400],
          },
        }}
        bgColor={"white:alpha.50"}
        borderColor={"muted.400"}
        py={"0"}
      />

      <CustomAnimated.Button
        size={"lg"}
        onPress={handlePressPlus}
        isDisabled={Number(convertWaspToPoint(props.value)) >= MAX_INPUT_VALUE}
        _text={{
          color: "text.700",
          fontSize: "lg",
        }}
        variant={"unstyled"}
        style={{ transform: [{ scale: scalePlus }] }}
      >
        +2,5kg
      </CustomAnimated.Button>
    </HStack>
  );
};
