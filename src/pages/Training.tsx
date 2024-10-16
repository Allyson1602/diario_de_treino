import Ionicons from "@expo/vector-icons/Ionicons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Center, HStack, ScrollView, Text, useTheme, VStack } from "native-base";
import { FunctionComponent } from "react";
import { cancelAnimation, SharedValue, useSharedValue, withTiming } from "react-native-reanimated";
import { Card } from "../components/Card";
import { CustomAnimated } from "../components/ui/CustomAnimated";
import { useExercise } from "../hooks/useExercise";
import { useTraining } from "../hooks/useTraining";
import { ExerciseModel } from "../models/exercise.model";
import { RootStackParamList } from "../navigation";

type TrainingProps = NativeStackScreenProps<RootStackParamList, "Training", "RootStack">;

export const Training: FunctionComponent<TrainingProps> = ({ navigation }) => {
  const theme = useTheme();
  const exerciseHook = useExercise();
  const trainingHook = useTraining();
  const scaleStartWorkout = useSharedValue(1);
  const scaleAddWorkout = useSharedValue(1);

  const defineAnimationOnPress = (scale: SharedValue<number>) => {
    cancelAnimation(scale);

    scale.value = withTiming(0.9, { duration: 200 }, () => {
      scale.value = withTiming(1, { duration: 200 });
    });
  };

  const handlePressNewWorkout = () => {
    navigation.navigate("Workout");
    defineAnimationOnPress(scaleAddWorkout);
  };

  const handleRemoveExercise = () => {
    console.log("remove");
  };

  const handlePressStartWorkout = () => {
    defineAnimationOnPress(scaleStartWorkout);
  };

  const handlePressExerciseItem = (exerciseItem: ExerciseModel) => {
    exerciseHook.setExerciseActive(exerciseItem);
    navigation.navigate("Workout");
  };

  return (
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

                <Card.TrashButtonIcon onRemove={handleRemoveExercise} />
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
  );
};
