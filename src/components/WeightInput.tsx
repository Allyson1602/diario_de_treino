import { HStack, Button, Input } from "native-base";
import { FunctionComponent, useState } from "react";

export const WeightInput: FunctionComponent = () => {
  const [weightValue, setWeightValue] = useState("0");

  const handlePressLess = () => {
    const newValue = parseFloat(weightValue) - 2.5;
    if (newValue >= 0) {
      setWeightValue(newValue.toString());
    }
  };

  const handlePressPlus = () => {
    const newValue = parseFloat(weightValue) + 2.5;
    if (newValue <= 999) {
      setWeightValue(newValue.toString());
    }
  };

  const handleChangeWeight = (text: string) => {
    const numericValue = parseFloat(text);
    if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 999) {
      setWeightValue(text);
    }
  };

  return (
    <HStack justifyContent={"center"}>
      <Button
        onPress={handlePressLess}
        isDisabled={parseFloat(weightValue) <= 0}
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
        value={weightValue}
        onChangeText={handleChangeWeight}
      />

      <Button
        onPress={handlePressPlus}
        isDisabled={parseFloat(weightValue) >= 999}
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
