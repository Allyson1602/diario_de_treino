import Feather from "@expo/vector-icons/Feather";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { useFocusEffect } from "@react-navigation/native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { HStack, Input, Pressable, Text, useTheme } from "native-base";
import { FunctionComponent, useCallback, useRef, useState } from "react";
import { cancelAnimation, useSharedValue, withTiming } from "react-native-reanimated";
import { useTraining } from "../hooks/useTraining";
import { ExerciseModel } from "../models/exercise.model";
import { CustomAnimated } from "./ui/CustomAnimated";

const DEFAULT_EXERCISE_NAME = "Nome do exercício";

export const HeaderWorkout: FunctionComponent<NativeStackHeaderProps> = (props) => {
  const exerciseNameInputRef = useRef<HTMLInputElement>(null);
  const theme = useTheme();
  const trainingHook = useTraining();
  const scale = useSharedValue(1);

  const [isActive, setIsActive] = useState(false);
  const [exerciseNameValue, setExerciseNameValue] = useState(
    trainingHook.exerciseActive?.name || DEFAULT_EXERCISE_NAME,
  );

  const defineGoBackAnimationOnPress = () => {
    cancelAnimation(scale);

    scale.value = withTiming(0.9, { duration: 200 }, () => {
      scale.value = withTiming(1, { duration: 200 });
    });
  };

  const handleGoBack = () => {
    defineGoBackAnimationOnPress();
    props.navigation.navigate("Training");
  };

  const handlePressText = () => {
    setIsActive(true);
  };

  const handleBlurInput = () => {
    setIsActive(false);
  };

  const handleChangeText = (text: string) => {
    const exerciseActive = trainingHook.exerciseActive;

    if (!exerciseActive) return;

    setExerciseNameValue(text);

    const exerciseUpdated: ExerciseModel = {
      ...exerciseActive,
      name: text,
    };

    const exercisesTraining = trainingHook.trainingActive?.exercises || [];

    const hasExerciseTraining = exercisesTraining.some(({ id }) => id === exerciseUpdated.id);
    let updateExercisesTraining: ExerciseModel[] = [];

    if (hasExerciseTraining) {
      updateExercisesTraining = exercisesTraining.map((exerciseItem) => {
        if (exerciseItem.id === exerciseUpdated.id) {
          return exerciseUpdated;
        }

        return exerciseItem;
      });
    } else {
      updateExercisesTraining.push(exerciseUpdated);
    }

    trainingHook.updateData({
      ...trainingHook.trainingActive!,
      exercises: updateExercisesTraining,
    });

    trainingHook.setExerciseActive(exerciseUpdated);
  };

  useFocusEffect(
    useCallback(() => {
      if (isActive) {
        exerciseNameInputRef.current?.focus();
      }
    }, [isActive]),
  );

  return (
    <HStack safeArea p={"4"} alignItems={"center"}>
      <CustomAnimated.IconButton
        icon={<SimpleLineIcons name="arrow-left" size={22} color="black" />}
        onPress={handleGoBack}
        rounded={"full"}
        style={{ transform: [{ scale }] }}
        variant={"unstyled"}
      />

      <HStack flex={"1"} justifyContent={"center"} pr={"22"}>
        {isActive ? (
          <Input
            selectTextOnFocus
            value={exerciseNameValue}
            flex={"1"}
            alignSelf={"center"}
            textAlign={"center"}
            variant={"unstyled"}
            fontSize={"lg"}
            py={"0"}
            selectionColor={theme.colors.blue[400]}
            onBlur={handleBlurInput}
            onChangeText={handleChangeText}
            ref={exerciseNameInputRef}
            InputRightElement={
              <Feather
                name="edit-3"
                size={18}
                color="black"
                style={{ opacity: 0, paddingLeft: 8 }}
              />
            }
            _focus={{
              _android: {
                selectionColor: theme.colors.blue[400],
              },
            }}
          />
        ) : (
          <Pressable flex={"1"} onPress={handlePressText}>
            <HStack space={"2"} flex={"1"} justifyContent={"center"} alignItems={"center"}>
              <Text textAlign={"center"} fontSize={"lg"}>
                {exerciseNameValue}
              </Text>
              <Feather name="edit-3" size={18} color="black" />
            </HStack>
          </Pressable>
        )}
      </HStack>
    </HStack>
  );
};
