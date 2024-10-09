import { Button, HStack, Input } from "native-base";
import { FunctionComponent } from "react";

const MAX_INPUT_VALUE = 999;
const MIN_INPUT_VALUE = 0;

interface WeightInputProps {
  onPressPlus?: (newValue: number) => void;
  onPressLess?: (newValue: number) => void;
  onChangeInput: (value: number | null) => void;
  value: number | null;
}

export const WeightInput: FunctionComponent<WeightInputProps> = (props) => {
  const handlePressLess = () => {
    if (props.value && props.value >= MIN_INPUT_VALUE) {
      props.onPressLess?.(props.value - 2.5);
    }
  };

  const handlePressPlus = () => {
    const numericValue = props.value || 2.5;

    if (props.value && numericValue <= MAX_INPUT_VALUE) {
      props.onPressPlus?.(numericValue + 2.5);
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
        isDisabled={
          props.value && props.value <= MIN_INPUT_VALUE ? true : false
        }
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
        value={String(props.value)}
        onChangeText={handleChangeWeight}
      />

      <Button
        onPress={handlePressPlus}
        isDisabled={
          props.value && props.value <= MAX_INPUT_VALUE ? true : false
        }
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
