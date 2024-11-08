import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Icon, Input, useTheme, VStack } from "native-base";
import React, { FunctionComponent, useCallback, useState } from "react";
import { GestureResponderEvent, TouchableOpacity } from "react-native";
import { isNumber } from "../utils/isNumber";
import { onlyPositiveNumber } from "../utils/onlyPositiveNumber";
import { useFocusEffect } from "@react-navigation/native";

export const MAX_INPUT_VALUE = 99;
const MIN_INPUT_VALUE = 0;

interface VerticalNumberInputProps {
  onPressCaretUp?: (newValue: number | null) => void;
  onPressCaretDown?: (newValue: number | null) => void;
  onChangeInput?: (value: number | null) => void;
  value?: number | null;
}

export const VerticalNumberInput: FunctionComponent<VerticalNumberInputProps> = (props) => {
  const theme = useTheme();

  const [inputValue, setInputValue] = useState<number | null>();

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

    setInputValue(newValue);
    props.onChangeInput?.(newValue);
  };

  const handlePressCaretUp = (event: GestureResponderEvent) => {
    let newValue = isNumber(inputValue);
    newValue = onlyPositiveNumber(newValue);

    const incrementValue = newValue ? newValue + 1 : 1;

    setInputValue(incrementValue);
    props.onPressCaretUp?.(incrementValue);
  };

  const handlePressCaretDown = (event: GestureResponderEvent) => {
    let newValue = isNumber(inputValue);
    newValue = onlyPositiveNumber(newValue);

    const decrementValue = newValue ? newValue - 1 : 0;

    setInputValue(decrementValue);
    props.onPressCaretDown?.(decrementValue);
  };

  useFocusEffect(
    useCallback(() => {
      setInputValue(props.value);
    }, [props.value]),
  );

  return (
    <VStack justifyContent={"center"} alignItems={"center"}>
      <TouchableOpacity
        onPress={(event) => handlePressCaretUp(event)}
        disabled={inputValue === MAX_INPUT_VALUE}
      >
        <Icon
          as={FontAwesome}
          name="caret-up"
          size={50}
          textAlign="center"
          color={inputValue === MAX_INPUT_VALUE ? "muted.400" : "primary.500"}
        />
      </TouchableOpacity>

      <Input
        inputMode={"numeric"}
        caretHidden
        selectTextOnFocus
        _focus={{
          bgColor: "#FFFFFF80",
          borderColor: "primary.500",
          _android: {
            selectionColor: theme.colors.blue[400],
          },
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
        value={inputValue?.toString() || undefined}
        onChangeText={handleChangeInput}
        selectionColor={theme.colors.blue[400]}
      />

      <TouchableOpacity
        onPress={(event) => handlePressCaretDown(event)}
        disabled={inputValue === MIN_INPUT_VALUE}
      >
        <Icon
          as={FontAwesome}
          name="caret-down"
          size={50}
          color={inputValue === MIN_INPUT_VALUE ? "muted.400" : "primary.500"}
          textAlign="center"
        />
      </TouchableOpacity>
    </VStack>
  );
};
