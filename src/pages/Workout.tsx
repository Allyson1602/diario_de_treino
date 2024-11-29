import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import {
  Badge,
  Box,
  Button,
  HStack,
  Modal,
  Text,
  TextArea,
  useDisclose,
  useTheme,
  VStack,
} from "native-base";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import Tooltip from "react-native-walkthrough-tooltip";
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
import { WalkthroughContext } from "../redux/walkthrough.context";
import userMetadataStorage from "../storages/userMetadata.storage";

type WorkoutProps = NativeStackScreenProps<RootStackParamList, "Workout", "RootStack">;

export const Workout: FunctionComponent<WorkoutProps> = ({ navigation }) => {
  const theme = useTheme();
  const trainingHook = useTraining();
  const finishDisclose = useDisclose();
  const muscleDisclose = useDisclose();
  const dispatch = useAppDispatch();
  const { currentTooltip, setCurrentTooltip } = useContext(WalkthroughContext);

  const [repetitionValue, setRepetitionValue] = useState<number | null>(null);

  const openTutorialStorage = async () => {
    const isTutorialCompleted = await userMetadataStorage.getTutorialWorkout();

    if (!isTutorialCompleted) {
      setCurrentTooltip("firstInfoExercise");
    }
  };

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

  const isLastExercise = (): boolean => {
    const indexLastExercise = getIndexLastExercise();
    const trainingActive = trainingHook.trainingActive;

    if (trainingActive && indexLastExercise === trainingActive.exercises.length - 1) return true;

    return false;
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

    if (isLastExercise()) {
      void createExercise();
      setRepetitionValue(null);
    } else {
      trainingHook.setExerciseActive(trainingActive.exercises[indexLastExercise + 1]);
    }

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

  useEffect(() => {
    openTutorialStorage();
  }, []);

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
      <StatusBar
        backgroundColor={
          currentTooltip === "" ||
          currentTooltip === "firstInfoExercise" ||
          currentTooltip === "secondInfoExercise"
            ? undefined
            : "#00000080"
        }
      />

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

        <Tooltip
          isVisible={currentTooltip === "repetitions"}
          content={
            <Box>
              <Text>Informe a repetição atual e a quantidade de repetições</Text>
            </Box>
          }
          onClose={() => setCurrentTooltip("weight")}
          placement="bottom"
        >
          <VStack
            space={"1"}
            alignItems={"center"}
            bgColor={currentTooltip === "repetitions" ? "white:alpha.80" : "transparent"}
            padding={currentTooltip === "repetitions" ? "2" : "0"}
            borderRadius={currentTooltip === "repetitions" ? "2xl" : "none"}
          >
            <Text fontSize={"md"} color={"text.900"} fontWeight={"medium"}>
              Repetições
            </Text>
            <HStack alignItems={"center"} space={"2"}>
              <VerticalNumberInput
                value={repetitionValue}
                onChangeInput={currentTooltip === "repetitions" ? undefined : setRepetitionValue}
                onPressCaretDown={currentTooltip === "repetitions" ? undefined : setRepetitionValue}
                onPressCaretUp={currentTooltip === "repetitions" ? undefined : setRepetitionValue}
                maxNumber={trainingHook.exerciseActive?.repetitions}
              />
              <Text fontSize={"lg"} color={"text.900"} fontWeight={"medium"}>
                de
              </Text>
              <VerticalNumberInput
                value={trainingHook.exerciseActive?.repetitions}
                onChangeInput={
                  currentTooltip === "repetitions" ? undefined : handleChangeMaxRepetition
                }
                onPressCaretDown={
                  currentTooltip === "repetitions" ? undefined : handlePressDownMaxRepetition
                }
                onPressCaretUp={
                  currentTooltip === "repetitions" ? undefined : handlePressUpMaxRepetition
                }
              />
            </HStack>
          </VStack>
        </Tooltip>

        <Tooltip
          isVisible={currentTooltip === "weight"}
          content={
            <Box>
              <Text>Defina a carga usada</Text>
            </Box>
          }
          onClose={() => setCurrentTooltip("timerValue")}
          placement="bottom"
        >
          <VStack
            space={"1"}
            alignItems={"center"}
            bgColor={currentTooltip === "weight" ? "white:alpha.80" : "transparent"}
            padding={currentTooltip === "weight" ? "2" : "0"}
            borderRadius={currentTooltip === "weight" ? "2xl" : "none"}
          >
            <Text fontSize={"md"} color={"text.900"} fontWeight={"medium"}>
              Carga
            </Text>

            <WeightInput
              value={trainingHook.exerciseActive?.weight || ""}
              onChangeInput={currentTooltip === "weight" ? () => {} : handleChangeWeight}
              onPressLess={currentTooltip === "weight" ? () => {} : handlePressLessWeight}
              onPressPlus={currentTooltip === "weight" ? () => {} : handlePressPlusWeight}
            />
          </VStack>
        </Tooltip>

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
              isLastExercise={isLastExercise()}
            />
          </HStack>
        </VStack>
      </VStack>

      <VStack safeArea position={"absolute"} top={"16"} right={"0"}>
        <Tooltip
          isVisible={currentTooltip === "finished"}
          content={
            <Box>
              <Text>Aqui você pode finalizar seu treino</Text>
            </Box>
          }
          onClose={() => {
            setCurrentTooltip("");
            userMetadataStorage.toggleTutorialWorkout();
          }}
          placement="bottom"
        >
          <CustomAnimated.IconButton
            bgColor={currentTooltip === "finished" ? "white:alpha.80" : "transparent"}
            borderRadius={currentTooltip === "finished" ? "2xl" : "none"}
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
            onPress={currentTooltip === "finished" ? undefined : handlePressOpenFinish}
          />
        </Tooltip>

        <Tooltip
          isVisible={currentTooltip === "muscleGroup"}
          content={
            <Box>
              <Text>Defina os grupos musculares trabalhados</Text>
            </Box>
          }
          onClose={() => setCurrentTooltip("repetitions")}
          placement="bottom"
        >
          <Box
            bgColor={currentTooltip === "muscleGroup" ? "white:alpha.80" : "transparent"}
            paddingTop={currentTooltip === "muscleGroup" ? "2" : "0"}
            borderRadius={currentTooltip === "muscleGroup" ? "2xl" : "none"}
            w={"full"}
          >
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
              onPress={currentTooltip === "muscleGroup" ? undefined : handlePressOpenMuscle}
            />
          </Box>
        </Tooltip>
      </VStack>

      <FinishTrainingModal isOpen={finishDisclose.isOpen} onClose={finishDisclose.onClose} />
      <MuscleModal isOpen={muscleDisclose.isOpen} onClose={muscleDisclose.onClose} />

      <Modal
        isOpen={currentTooltip === "firstInfoExercise"}
        onClose={() => setCurrentTooltip("secondInfoExercise")}
      >
        <Modal.Content maxWidth="400px">
          <Modal.Body>
            <Text>Aqui você pode configurar seu novo exercício</Text>
            <HStack justifyContent={"flex-end"}>
              <Button
                colorScheme={"green"}
                variant={"ghost"}
                onPress={() => setCurrentTooltip("secondInfoExercise")}
              >
                próximo
              </Button>
            </HStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>

      <Modal
        isOpen={currentTooltip === "secondInfoExercise"}
        onClose={() => setCurrentTooltip("exerciseName")}
      >
        <Modal.Content maxWidth="400px">
          <Modal.Body>
            <Text>Cada novo exercício é adicionado automaticamente na lista de exercícios</Text>
            <HStack justifyContent={"flex-end"}>
              <Button
                colorScheme={"green"}
                variant={"ghost"}
                onPress={() => setCurrentTooltip("exerciseName")}
              >
                próximo
              </Button>
            </HStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </Box>
  );
};
