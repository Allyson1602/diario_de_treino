import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useFocusEffect } from "@react-navigation/native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { HStack, Input, Pressable, Text, useTheme } from "native-base";
import { FunctionComponent, useCallback, useRef, useState } from "react";

const DEFAULT_WORKOUT_NAME = "Nome do exercício";

export const HeaderTraining: FunctionComponent<NativeStackHeaderProps> = (props) => {
  const workoutNameInputRef = useRef<HTMLInputElement>(null);
  const theme = useTheme();

  const [isActive, setIsActive] = useState(false);
  const [workoutNameValue, setWorkoutNameValue] = useState(DEFAULT_WORKOUT_NAME);

  const handlePressText = () => {
    setIsActive(true);
  };

  const handleBlurInput = () => {
    setIsActive(false);
  };

  const handleChangeText = (text: string) => {
    setWorkoutNameValue(text);
  };

  useFocusEffect(
    useCallback(() => {
      if (isActive) {
        workoutNameInputRef.current?.focus();
      }
    }, [isActive]),
  );

  return (
    <HStack safeArea p={"4"} alignItems={"center"}>
      <Ionicons name="chevron-back" size={32} color="black" />

      {isActive ? (
        <Input
          selectTextOnFocus
          value={workoutNameValue}
          flex={"1"}
          alignSelf={"center"}
          textAlign={"center"}
          variant={"unstyled"}
          fontSize={"lg"}
          py={"0"}
          selectionColor={theme.colors.blue[400]}
          onBlur={handleBlurInput}
          onChangeText={handleChangeText}
          ref={workoutNameInputRef}
          InputRightElement={
            <Feather name="edit-3" size={24} color="black" style={{ opacity: 0 }} />
          }
          _focus={{
            _android: {
              selectionColor: theme.colors.blue[400],
            },
          }}
        />
      ) : (
        <Pressable flex={"1"} onPress={handlePressText}>
          <HStack space={"1"} flex={"1"} justifyContent={"center"} alignItems={"center"}>
            <Text textAlign={"center"} fontSize={"lg"}>
              {workoutNameValue}
            </Text>
            <Feather name="edit-3" size={24} color="black" />
          </HStack>
        </Pressable>
      )}
    </HStack>
  );
};
