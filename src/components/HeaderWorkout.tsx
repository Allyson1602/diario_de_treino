import Feather from "@expo/vector-icons/Feather";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { useFocusEffect } from "@react-navigation/native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Box, HStack, Input, Pressable, Text, useTheme } from "native-base";
import { FunctionComponent, useCallback, useContext, useRef, useState } from "react";
import { cancelAnimation, useSharedValue, withTiming } from "react-native-reanimated";
import Tooltip from "react-native-walkthrough-tooltip";
import { useTraining } from "../hooks/useTraining";
import { ExerciseModel } from "../models/exercise.model";
import { WalkthroughContext } from "../contexts/walkthrough.context";
import { CustomAnimated } from "./ui/CustomAnimated";
import { useRecoilState } from "recoil";
import { exerciseActiveState } from "../contexts/recoil/exerciseActiveState";
import { trainingActiveState } from "../contexts/recoil/trainingActiveState";

const DEFAULT_EXERCISE_NAME = "Exercício";

export const HeaderWorkout: FunctionComponent<NativeStackHeaderProps> = (props) => {
  const exerciseNameInputRef = useRef<HTMLInputElement>(null);
  const theme = useTheme();
  const trainingHook = useTraining();
  const scale = useSharedValue(1);
  const { currentTooltip, setCurrentTooltip } = useContext(WalkthroughContext);

  const [isActive, setIsActive] = useState(false);
  const [exerciseNameValue, setExerciseNameValue] = useState(DEFAULT_EXERCISE_NAME);
  const [exerciseActive, setExerciseActive] = useRecoilState(exerciseActiveState);
  const [trainingActive, setTrainingActive] = useRecoilState(trainingActiveState);

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
    if (!exerciseActive) return;

    setExerciseNameValue(text);

    const exerciseUpdated: ExerciseModel = {
      ...exerciseActive,
      name: text,
    };

    const exercisesTraining = trainingActive?.exercises || [];

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

    trainingHook.updateStorageData({
      ...trainingActive!,
      exercises: updateExercisesTraining,
    });

    setExerciseActive(exerciseUpdated);
  };

  useFocusEffect(
    useCallback(() => {
      if (isActive) {
        exerciseNameInputRef.current?.focus();
      }
    }, [isActive]),
  );

  useFocusEffect(
    useCallback(() => {
      if (exerciseActive) {
        setExerciseNameValue(exerciseActive.name);
      }
    }, [exerciseActive]),
  );

  return (
    <HStack safeArea p={"4"} alignItems={"center"}>
      <StatusBar backgroundColor={currentTooltip === "" ? undefined : "#00000080"} />
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
          <Tooltip
            isVisible={currentTooltip === "exerciseName"}
            content={
              <Box>
                <Text>Crie um nome para seu exercício</Text>
              </Box>
            }
            onClose={() => setCurrentTooltip("muscleGroup")}
            placement="bottom"
          >
            <Pressable
              flex={"1"}
              onPress={currentTooltip === "exerciseName" ? undefined : handlePressText}
            >
              <HStack
                space={"2"}
                flex={"1"}
                justifyContent={"center"}
                alignItems={"center"}
                bgColor={currentTooltip === "exerciseName" ? "white:alpha.80" : "transparent"}
                paddingX={currentTooltip === "exerciseName" ? "4" : "0"}
                borderRadius={currentTooltip === "exerciseName" ? "2xl" : "none"}
              >
                <Text textAlign={"center"} fontSize={"lg"}>
                  {exerciseNameValue}
                </Text>
                <Feather name="edit-3" size={18} color="black" />
              </HStack>
            </Pressable>
          </Tooltip>
        )}
      </HStack>
    </HStack>
  );
};
