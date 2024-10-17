import { Button, HStack, Input, useTheme } from "native-base";
import { FunctionComponent } from "react";

const MAX_INPUT_VALUE = 999.99;
const MIN_INPUT_VALUE = 0;

interface WeightInputProps {
  onPressPlus: (newValue: number) => void;
  onPressLess: (newValue: number) => void;
  onChangeInput: (value: number) => void;
  value: number;
}

export const WeightInput: FunctionComponent<WeightInputProps> = (props) => {
  const theme = useTheme();

  const handlePressLess = () => {
    if (props.value >= MIN_INPUT_VALUE) {
      props.onPressLess(props.value - 2.5);
    }
  };

  const handlePressPlus = () => {
    if (props.value <= MAX_INPUT_VALUE) {
      props.onPressPlus(props.value + 2.5);
    }
  };

  const handleChangeWeight = (text: string) => {
    const numericValue = parseFloat(text);

    if (
      !isNaN(numericValue) &&
      numericValue >= MIN_INPUT_VALUE &&
      numericValue <= MAX_INPUT_VALUE
    ) {
      props.onChangeInput(numericValue);
      return;
    }

    props.onChangeInput(0);
  };

  return (
    <HStack justifyContent={"center"} space={"4"}>
      <Button
        size={"lg"}
        onPress={handlePressLess}
        isDisabled={props.value <= MIN_INPUT_VALUE}
        _text={{
          color: "text.500",
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
        value={props.value.toString()}
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
      />

      <Button
        size={"lg"}
        onPress={handlePressPlus}
        isDisabled={props.value >= MAX_INPUT_VALUE}
        _text={{
          color: "text.500",
          fontSize: "lg",
        }}
        variant={"unstyled"}
      >
        +2,5kg
      </Button>
    </HStack>
  );
};
