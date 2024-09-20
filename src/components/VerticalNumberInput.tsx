import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Icon, Input, VStack } from "native-base";
import React, { FunctionComponent } from "react";
import { GestureResponderEvent, TouchableOpacity } from "react-native";
import { isNumber } from "../utils/isNumber";
import { onlyPositiveNumber } from "../utils/onlyPositiveNumber";

const MAX_INPUT_VALUE = 99;
const MIN_INPUT_VALUE = 0;

interface VerticalNumberInputProps {
  onPressCaretUp?: (newValue: number | null) => void;
  onPressCaretDown?: (newValue: number | null) => void;
  onChangeInput?: (value: number | null) => void;
  value?: number | null;
}

export const VerticalNumberInput: FunctionComponent<
  VerticalNumberInputProps
> = (props) => {
  const defineMaxNumberValue = (numberValue: number | null) => {
    if (!numberValue) return null;

    const MAX_DECIMAL_PLACE = 2;
    const stringValue = numberValue?.toString();

    if (stringValue.length > MAX_DECIMAL_PLACE) {
      const sliceValue = stringValue.slice(1, MAX_DECIMAL_PLACE + 1);
      numberValue = Number(sliceValue);
    }

    return numberValue;
  };

  const handleChangeInput = (value: string) => {
    let newValue = isNumber(value);
    newValue = onlyPositiveNumber(newValue);
    newValue = defineMaxNumberValue(newValue);

    props.onChangeInput?.(newValue);
  };

  const handlePressCaretUp = (event: GestureResponderEvent) => {
    let newValue = isNumber(props.value);
    newValue = onlyPositiveNumber(newValue);

    const incrementValue = newValue ? newValue + 1 : 1;

    props.onPressCaretUp?.(incrementValue);
  };

  const handlePressCaretDown = (event: GestureResponderEvent) => {
    let newValue = isNumber(props.value);
    newValue = onlyPositiveNumber(newValue);

    const decrementValue = newValue ? newValue - 1 : 0;

    props.onPressCaretDown?.(decrementValue);
  };

  return (
    <VStack justifyContent={"center"} alignItems={"center"}>
      <TouchableOpacity
        onPress={(event) => handlePressCaretUp(event)}
        disabled={props.value === MAX_INPUT_VALUE}
      >
        <Icon
          as={FontAwesome}
          name="caret-up"
          size={50}
          textAlign="center"
          color={props.value === MAX_INPUT_VALUE ? "muted.400" : "primary.500"}
        />
      </TouchableOpacity>

      <Input
        inputMode={"numeric"}
        caretHidden
        _focus={{
          bgColor: "#FFFFFF80",
          borderColor: "primary.500",
        }}
        bgColor={"#FFFFFF00"}
        borderColor={"muted.400"}
        borderRadius={"full"}
        fontSize={"2xl"}
        size={"2xl"}
        textAlign={"center"}
        placeholder="0"
        color={"text.900"}
        fontWeight={"medium"}
        textAlignVertical="bottom"
        width={"60"}
        height={"16"}
        value={props.value?.toString() || undefined}
        onChangeText={handleChangeInput}
      />

      <TouchableOpacity
        onPress={(event) => handlePressCaretDown(event)}
        disabled={props.value === MIN_INPUT_VALUE}
      >
        <Icon
          as={FontAwesome}
          name="caret-down"
          size={50}
          color={props.value === MIN_INPUT_VALUE ? "muted.400" : "primary.500"}
          textAlign="center"
        />
      </TouchableOpacity>
    </VStack>
  );
};
