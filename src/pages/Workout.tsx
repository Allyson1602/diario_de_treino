import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Badge, Box, HStack, Text, TextArea, useDisclose, useTheme, VStack } from "native-base";
import { FunctionComponent, useState } from "react";
import { ExerciseNavigation } from "../components/ExerciseNavigation";
import { ExerciseTimer } from "../components/ExerciseTimer";
import { FinishTrainingModal } from "../components/FinishTrainingModal";
import { MuscleModal } from "../components/MuscleModal";
import { CustomAnimated } from "../components/ui/CustomAnimated";
import { VerticalNumberInput } from "../components/VerticalNumberInput";
import { WeightInput } from "../components/WeightInput";
import { useTraining } from "../hooks/useTraining";
import { ExerciseModel } from "../models/exercise.model";
import { RootStackParamList } from "../navigation";
import { useAppDispatch } from "../redux/hooks";
import {
  setAnnotationExercise,
  setRepetitionsExercise,
  setTimerExercise,
  setWeightExercise,
} from "../redux/slices/exerciseSlice";
import { setExercise as setTrainingExercise } from "../redux/slices/trainingSlice";

type WorkoutProps = NativeStackScreenProps<RootStackParamList, "Workout", "RootStack">;

export const Workout: FunctionComponent<WorkoutProps> = ({ navigation }) => {
  const theme = useTheme();
  const trainingHook = useTraining();
  const finishDisclose = useDisclose();
  const muscleDisclose = useDisclose();
  const dispatch = useAppDispatch();

  const [repetitionValue, setRepetitionValue] = useState<number | null>(null);

  const updateStorageData = (exerciseUpdated: ExerciseModel) => {
    const exercisesTraining = trainingHook.trainingActive?.exercises || [];

    const updateExercisesTraining = exercisesTraining.map((exerciseItem) => {
      if (exerciseItem.id === exerciseUpdated.id) {
        return exerciseUpdated;
      }

      return exerciseItem;
    });

    trainingHook.updateStorageData({
      ...trainingHook.trainingActive!,
      exercises: updateExercisesTraining,
    });

    dispatch(setTrainingExercise(exerciseUpdated));
  };

  const updateRepetitionsData = (repetitionNumberValue: number | null) => {
    const exerciseActive = trainingHook.exerciseActive;

    if (exerciseActive) {
      const exerciseUpdated: ExerciseModel = {
        ...exerciseActive,
        repetitions: repetitionNumberValue || 0,
      };

      requestAnimationFrame(() => {
        dispatch(setRepetitionsExercise(repetitionNumberValue || undefined));
      });
      void updateStorageData(exerciseUpdated);
    }
  };

  const createExercise = async () => {
    const trainingActive = trainingHook.trainingActive;
    const newExercise = await trainingHook.createExercise();

    trainingHook.setExerciseActive(newExercise);

    if (trainingActive) {
      const updateTraining = {
        ...trainingActive,
        exercises: [...trainingActive.exercises, newExercise],
      };

      trainingHook.setTrainingActive(updateTraining);
      trainingHook.updateStorageData(updateTraining);
    }
  };

  const updateWeightData = (weightValue: string) => {
    const exerciseActive = trainingHook.exerciseActive;

    if (exerciseActive) {
      const exerciseUpdated: ExerciseModel = {
        ...exerciseActive,
        weight: weightValue,
      };

      requestAnimationFrame(() => {
        dispatch(setWeightExercise(weightValue));
      });
      void updateStorageData(exerciseUpdated);
    }
  };

  const getIndexLastExercise = () => {
    const trainingExercises = trainingHook.trainingActive?.exercises;
    const currentExerciseId = trainingHook.exerciseActive?.id;

    if (trainingExercises) {
      return trainingExercises.findIndex(
        (trainingExerciseItem) => trainingExerciseItem.id === currentExerciseId,
      );
    }

    return -1;
  };

  const canBackExercise = () => {
    const exercisesList = trainingHook.trainingActive?.exercises;

    const isFirstExercise = exercisesList?.[0]?.id === trainingHook.exerciseActive?.id;

    return !exercisesList || !exercisesList[0] || isFirstExercise;
  };

  const handlePressOpenFinish = () => {
    finishDisclose.onOpen();
  };

  const handlePressOpenMuscle = () => {
    muscleDisclose.onOpen();
  };

  const handleChangeAnnotation = (text: string) => {
    const exerciseActive = trainingHook.exerciseActive;

    if (exerciseActive) {
      const exerciseUpdated: ExerciseModel = {
        ...exerciseActive,
        annotation: text,
      };

      requestAnimationFrame(() => {
        dispatch(setAnnotationExercise(text));
      });
      void updateStorageData(exerciseUpdated);
    }
  };

  const handleChangeMaxRepetition = (repetitionNumberValue: number | null) => {
    void updateRepetitionsData(repetitionNumberValue);
  };

  const handlePressDownMaxRepetition = (repetitionNumberValue: number | null) => {
    void updateRepetitionsData(repetitionNumberValue);
  };

  const handlePressUpMaxRepetition = (repetitionNumberValue: number | null) => {
    void updateRepetitionsData(repetitionNumberValue);
  };

  const handleChangeWeight = (weightValue: string) => {
    void updateWeightData(weightValue);
  };

  const handlePressPlusWeight = (weightValue: string) => {
    void updateWeightData(weightValue);
  };

  const handlePressLessWeight = (weightValue: string) => {
    void updateWeightData(weightValue);
  };

  const handleChangeTimer = (timerValue: string) => {
    const exerciseActive = trainingHook.exerciseActive;

    if (exerciseActive) {
      const exerciseUpdated: ExerciseModel = {
        ...exerciseActive,
        timer: timerValue,
      };

      requestAnimationFrame(() => {
        dispatch(setTimerExercise(timerValue));
      });
      void updateStorageData(exerciseUpdated);
    }
  };

  const handlePressNavigateNext = () => {
    const indexLastExercise = getIndexLastExercise();
    const trainingActive = trainingHook.trainingActive;

    if (!trainingActive) return;

    if (indexLastExercise === trainingActive.exercises.length - 1) {
      void createExercise();

      setRepetitionValue(null);
      navigation.push("Workout");

      return;
    }

    trainingHook.setExerciseActive(trainingActive.exercises[indexLastExercise + 1]);
    navigation.push("Workout");
  };

  const handlePressNavigateBack = () => {
    const trainingActive = trainingHook.trainingActive;
    const indexLastExercise = getIndexLastExercise();

    if (trainingActive) {
      const lastExercise = trainingActive.exercises[indexLastExercise - 1];

      trainingHook.setExerciseActive(lastExercise);
      navigation.goBack();
    }
  };

  return (
    <Box
      safeArea
      position={"relative"}
      flex={"1"}
      background={{
        linearGradient: {
          colors: ["#FFACBA", "#EEEEEE"],
          start: [2, 0],
          end: [0, 1],
        },
      }}
    >
      <VStack
        safeArea
        flex={"1"}
        justifyContent={"space-between"}
        alignItems={"center"}
        pt={"8"}
        pb={"2"}
      >
        <VStack safeArea space={"1"} alignItems={"center"} px={"6"}>
          <Text fontSize={"md"} color={"text.900"} fontWeight={"medium"}>
            Anotações
          </Text>

          <Box pr={"8"}>
            <TextArea
              value={trainingHook.exerciseActive?.annotation}
              onChangeText={handleChangeAnnotation}
              autoCompleteType={true}
              placeholder="Digite aqui suas anotações..."
              w={"full"}
              size={"md"}
              textAlign={"center"}
              variant={"unstyled"}
            />
          </Box>
        </VStack>

        <VStack space={"1"} alignItems={"center"}>
          <Text fontSize={"md"} color={"text.900"} fontWeight={"medium"}>
            Repetições
          </Text>
          <HStack alignItems={"center"} space={"2"}>
            <VerticalNumberInput
              value={repetitionValue}
              onChangeInput={setRepetitionValue}
              onPressCaretDown={setRepetitionValue}
              onPressCaretUp={setRepetitionValue}
              maxNumber={trainingHook.exerciseActive?.repetitions}
            />
            <Text fontSize={"lg"} color={"text.900"} fontWeight={"medium"}>
              de
            </Text>
            <VerticalNumberInput
              value={trainingHook.exerciseActive?.repetitions}
              onChangeInput={handleChangeMaxRepetition}
              onPressCaretDown={handlePressDownMaxRepetition}
              onPressCaretUp={handlePressUpMaxRepetition}
            />
          </HStack>
        </VStack>

        <VStack space={"1"} alignItems={"center"}>
          <Text fontSize={"md"} color={"text.900"} fontWeight={"medium"}>
            Carga
          </Text>

          <WeightInput
            value={trainingHook.exerciseActive?.weight || ""}
            onChangeInput={handleChangeWeight}
            onPressLess={handlePressLessWeight}
            onPressPlus={handlePressPlusWeight}
          />
        </VStack>

        <VStack>
          <ExerciseTimer
            timerValue={trainingHook.exerciseActive?.timer || "2:00"}
            onChangeTimerValue={handleChangeTimer}
          />

          <HStack justifyContent={"center"}>
            <ExerciseNavigation
              leftIconDisabled={canBackExercise()}
              onPressLeft={handlePressNavigateBack}
              onPressRight={handlePressNavigateNext}
            />
          </HStack>
        </VStack>
      </VStack>

      <VStack safeArea position={"absolute"} top={"16"} right={"0"}>
        <CustomAnimated.IconButton
          variant={"unstyled"}
          icon={
            <MaterialCommunityIcons
              name="fire"
              size={45}
              color={
                repetitionValue === trainingHook.exerciseActive?.repetitions
                  ? theme.colors.primary[500]
                  : theme.colors.muted[400]
              }
            />
          }
          onPress={handlePressOpenFinish}
        />

        <Box>
          <Badge
            colorScheme="lightBlue"
            rounded="full"
            mb={"-4"}
            mr={"2"}
            p={"0"}
            w={"6"}
            py={"0.5"}
            zIndex={1}
            variant="solid"
            alignSelf="flex-end"
            _text={{
              fontSize: 12,
            }}
          >
            {trainingHook.exerciseActive?.muscles.length || 0}
          </Badge>

          <CustomAnimated.IconButton
            variant={"unstyled"}
            icon={<Ionicons name="body-outline" size={35} color={theme.colors.lightBlue[500]} />}
            onPress={handlePressOpenMuscle}
          />
        </Box>
      </VStack>

      <FinishTrainingModal isOpen={finishDisclose.isOpen} onClose={finishDisclose.onClose} />
      <MuscleModal isOpen={muscleDisclose.isOpen} onClose={muscleDisclose.onClose} />
    </Box>
  );
};
