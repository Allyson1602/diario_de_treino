import Ionicons from "@expo/vector-icons/Ionicons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Button,
  Center,
  HStack,
  Modal,
  ScrollView,
  Text,
  useDisclose,
  useTheme,
  VStack,
} from "native-base";
import { FunctionComponent } from "react";
import { cancelAnimation, SharedValue, useSharedValue, withTiming } from "react-native-reanimated";
import { Card } from "../components/Card";
import { CustomAnimated } from "../components/ui/CustomAnimated";
import { useTraining } from "../hooks/useTraining";
import { ExerciseModel } from "../models/exercise.model";
import { RootStackParamList } from "../navigation";

type TrainingProps = NativeStackScreenProps<RootStackParamList, "Training", "RootStack">;

export const Training: FunctionComponent<TrainingProps> = ({ navigation }) => {
  const theme = useTheme();
  const trainingHook = useTraining();
  const { isOpen, onClose, onOpen } = useDisclose(false);
  const scaleStartWorkout = useSharedValue(1);
  const scaleAddWorkout = useSharedValue(1);

  const defineAnimationOnPress = (scale: SharedValue<number>) => {
    cancelAnimation(scale);

    scale.value = withTiming(0.9, { duration: 200 }, () => {
      scale.value = withTiming(1, { duration: 200 });
    });
  };

  const createExercise = (): void => {
    const trainingActive = trainingHook.trainingActive;
    const newExercise = trainingHook.createExercise();
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

  const handlePressNewWorkout = () => {
    defineAnimationOnPress(scaleAddWorkout);

    void createExercise();
    navigation.navigate("Workout");
  };

  const handleRemoveExercise = (exerciseSelected: ExerciseModel) => {
    const exercises = trainingHook.trainingActive?.exercises;

    if (exercises?.length === 1) {
      onOpen();
      return;
    }

    trainingHook.removeExercise(exerciseSelected);
  };

  const handlePressStartWorkout = () => {
    const firstExercise = trainingHook.trainingActive?.exercises[0];

    defineAnimationOnPress(scaleStartWorkout);

    if (firstExercise) {
      trainingHook.setExerciseActive(firstExercise);
    } else {
      void createExercise();
    }

    navigation.navigate("Workout");
  };

  const handlePressExerciseItem = (exerciseItem: ExerciseModel) => {
    trainingHook.setExerciseActive(exerciseItem);
    navigation.navigate("Workout");
  };

  const handleDeleteTraining = () => {
    trainingHook.removeStorageData(trainingHook.trainingActive!).then((status) => {
      if (status) {
        trainingHook.setTrainingActive(null);
        navigation.navigate("Home");
      }
    });
  };

  return (
    <>
      <VStack
        safeArea
        pt={"6"}
        pb={"6"}
        flex={1}
        background={{
          linearGradient: {
            colors: ["#FFACBA", "#EEEEEE"],
            start: [2, 0],
            end: [0, 1],
          },
        }}
        justifyContent={"space-between"}
      >
        <VStack safeArea pt={"6"} flex={"1"} mb={"10"}>
          <HStack alignItems={"center"} justifyContent={"space-between"} px={"6"}>
            <Text color={"text.500"} fontWeight={"medium"}>
              Exercícios
            </Text>

            <CustomAnimated.IconButton
              icon={<Ionicons name="add-circle" size={30} color={theme.colors.primary[600]} />}
              rounded={"full"}
              p={"0.5"}
              onPress={handlePressNewWorkout}
              style={{ transform: [{ scale: scaleAddWorkout }] }}
              variant={"unstyled"}
            />
          </HStack>

          <ScrollView
            contentContainerStyle={{
              gap: 8,
              paddingVertical: 8,
              paddingHorizontal: 24,
            }}
            showsVerticalScrollIndicator={false}
          >
            {trainingHook.trainingActive?.exercises.map((exerciseItem) => (
              <Card.Container
                key={exerciseItem.id}
                onPress={() => handlePressExerciseItem(exerciseItem)}
              >
                <HStack flexGrow={1} space={"4"}>
                  <VStack justifyContent={"space-between"} space={"4"} flex={"1"}>
                    <Card.Title text={exerciseItem.name} />

                    <Card.MuscleChips muscleNames={exerciseItem.muscles} />
                  </VStack>

                  <Card.TrashButtonIcon onRemove={() => handleRemoveExercise(exerciseItem)} />
                </HStack>
              </Card.Container>
            ))}
          </ScrollView>
        </VStack>

        <Center>
          <CustomAnimated.Button
            rounded={"full"}
            size={"lg"}
            px={"8"}
            style={{ transform: [{ scale: scaleStartWorkout }] }}
            _text={{
              fontSize: "3xl",
            }}
            onPress={handlePressStartWorkout}
          >
            Iniciar
          </CustomAnimated.Button>
        </Center>
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose} px={"6"}>
        <Modal.Content borderRadius={22} width={"full"}>
          <Modal.CloseButton
            _icon={{
              size: "xl",
            }}
          />
          <Modal.Body>
            <Text pt={"12"} fontSize={"lg"} textAlign={"center"}>
              Se você remover esse exercício, o treino será apagado!
            </Text>
            <Text fontSize={"lg"} pt={"8"} pb={"2"} textAlign={"center"}>
              Deseja continuar?
            </Text>
            <Button
              onPress={handleDeleteTraining}
              size={"lg"}
              backgroundColor={"danger.600"}
              _text={{ fontSize: "lg" }}
            >
              deletar treino
            </Button>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
};
