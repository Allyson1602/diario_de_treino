import { Button, HStack, Input, useTheme } from "native-base";
import { FunctionComponent } from "react";
import { convertPointToWasp } from "../utils/convertPointToWasp";
import { convertWaspToPoint } from "../utils/convertWaspToPoint";

const MAX_INPUT_VALUE = 999.99;
const MIN_INPUT_VALUE = 0;

interface WeightInputProps {
  onPressPlus: (newValue: string) => void;
  onPressLess: (newValue: string) => void;
  onChangeInput: (value: string) => void;
  value: string;
}

export const WeightInput: FunctionComponent<WeightInputProps> = (props) => {
  const theme = useTheme();

  const handlePressLess = () => {
    const weightNumber = Number(props.value);

    if (weightNumber >= MIN_INPUT_VALUE) {
      const sumWeight = weightNumber - 2.5;

      let weightString = String(sumWeight);
      weightString = convertPointToWasp(weightString);

      props.onPressLess(weightString);
    }
  };

  const handlePressPlus = () => {
    const weightNumber = Number(props.value);

    if (weightNumber <= MAX_INPUT_VALUE) {
      const sumWeight = weightNumber + 2.5;

      let weightString = String(sumWeight);
      weightString = convertPointToWasp(weightString);

      props.onPressPlus(weightString);
    }
  };

  const onlyTwoDecimals = (value: string) => {
    const numberSplited = value.split(".");

    if (numberSplited.length === 2) {
      return numberSplited[0] + "." + numberSplited[1].slice(0, 2);
    }

    return value;
  };

  const handleChangeWeight = (text: string) => {
    let weightText = convertWaspToPoint(text);
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
      <Button
        size={"lg"}
        onPress={handlePressLess}
        isDisabled={Number(props.value) <= MIN_INPUT_VALUE}
        _text={{
          color: "text.700",
          fontSize: "lg",
        }}
        variant={"unstyled"}
      >
        -2,5kg
      </Button>

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

      <Button
        size={"lg"}
        onPress={handlePressPlus}
        isDisabled={Number(props.value) >= MAX_INPUT_VALUE}
        _text={{
          color: "text.700",
          fontSize: "lg",
        }}
        variant={"unstyled"}
      >
        +2,5kg
      </Button>
    </HStack>
  );
};
