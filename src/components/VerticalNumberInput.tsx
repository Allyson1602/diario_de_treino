import FontAwesome from "@expo/vector-icons/FontAwesome";
import { IInputProps, Input, useTheme, VStack } from "native-base";
import React, { FunctionComponent } from "react";
import { TouchableOpacity } from "react-native";
import Animated from "react-native-reanimated";

interface VerticalNumberInputProps {
  onPressCaredUp?: () => void;
  onPressCaredDown?: () => void;
  inputProps?: IInputProps;
}

const AnimatedFontAwesome = Animated.createAnimatedComponent(FontAwesome);

export const VerticalNumberInput: FunctionComponent<
  VerticalNumberInputProps
> = (props) => {
  const theme = useTheme();

  return (
    <VStack justifyContent={"center"} alignItems={"center"}>
      <TouchableOpacity onPress={props.onPressCaredUp}>
        <AnimatedFontAwesome
          name="caret-up"
          size={50}
          color={theme.colors.primary[500]}
          style={{
            textAlign: "center",
          }}
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
        {...props.inputProps}
      />

      <TouchableOpacity onPress={props.onPressCaredDown}>
        <AnimatedFontAwesome
          name="caret-down"
          size={50}
          color={theme.colors.primary[500]}
          style={{
            textAlign: "center",
          }}
        />
      </TouchableOpacity>
    </VStack>
  );
};
