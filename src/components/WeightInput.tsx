import { Button, HStack, Input } from "native-base";
import { FunctionComponent } from "react";

const MAX_INPUT_VALUE = 999;
const MIN_INPUT_VALUE = 0;

interface WeightInputProps {
  onPressPlus: (newValue: number) => void;
  onPressLess: (newValue: number) => void;
  onChangeInput: (value: number) => void;
  value: number;
}

export const WeightInput: FunctionComponent<WeightInputProps> = (props) => {
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
    }
  };

  return (
    <HStack justifyContent={"center"}>
      <Button
        onPress={handlePressLess}
        isDisabled={props.value <= MIN_INPUT_VALUE}
        _text={{
          color: "text.500",
        }}
        _hover={{
          bg: "muted.400", // Muda a cor de fundo ao passar o mouse (hover)
        }}
        _focus={{
          bg: "muted.500", // Muda a cor de fundo quando focado
        }}
        variant={"unstyled"}
      >
        -2,5kg
      </Button>

      <Input
        inputMode="numeric"
        borderWidth={1}
        bgColor={"white.alpha.50"}
        borderColor={"muted.300"}
        rounded={"full"}
        textAlign={"center"}
        size={"lg"}
        width={"20"}
        value={props.value.toString()}
        onChangeText={handleChangeWeight}
      />

      <Button
        onPress={handlePressPlus}
        isDisabled={props.value >= MAX_INPUT_VALUE}
        _text={{
          color: "text.500",
        }}
        _hover={{
          bg: "muted.400", // Muda a cor de fundo ao passar o mouse (hover)
        }}
        _focus={{
          bg: "muted.500", // Muda a cor de fundo quando focado
        }}
        variant={"unstyled"}
      >
        +2,5kg
      </Button>
    </HStack>
  );
};
