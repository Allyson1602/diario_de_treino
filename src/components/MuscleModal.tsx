import { HStack, Modal, Text, useTheme, VStack } from "native-base";
import { FunctionComponent } from "react";
import { muscleGroups } from "../data/muscleGroups";
import { useTraining } from "../hooks/useTraining";
import { ExerciseModel } from "../models/exercise.model";
import { Chip } from "./Chip";

interface IMuscleModal {
  isOpen: boolean;
  onClose: () => void;
}

export const MuscleModal: FunctionComponent<IMuscleModal> = ({ isOpen, onClose }) => {
  const theme = useTheme();
  const trainingHook = useTraining();

  const checkMuscle = (musclesList: string[], muscleUpdated: string) => {
    return musclesList.some((muscleItem) => muscleItem === muscleUpdated);
  };

  const toggleMuscleExercise = (exerciseActive: ExerciseModel, muscleUpdated: string): string[] => {
    let musclesList = [...exerciseActive.muscles];

    const hasMuscle = checkMuscle(musclesList, muscleUpdated);

    if (hasMuscle) {
      musclesList = musclesList.filter((muscleItem) => muscleItem !== muscleUpdated);
    } else {
      musclesList.push(muscleUpdated);
    }

    return musclesList;
  };

  const updateData = (exerciseUpdated: ExerciseModel) => {
    const exercisesTraining = trainingHook.trainingActive?.exercises || [];

    const updateExercisesTraining = exercisesTraining.map((exerciseItem) => {
      if (exerciseItem.id === exerciseUpdated.id) {
        return exerciseUpdated;
      }

      return exerciseItem;
    });

    trainingHook.updateData({
      ...trainingHook.trainingActive!,
      exercises: updateExercisesTraining,
    });

    trainingHook.setExerciseActive(exerciseUpdated);

    const trainingExerciseUpdated =
      trainingHook.trainingActive?.exercises.map((exerciseItem) => {
        if (exerciseItem.id === exerciseUpdated.id) {
          return exerciseUpdated;
        }

        return exerciseItem;
      }) || [];

    trainingHook.setTrainingActive({
      ...trainingHook.trainingActive!,
      exercises: trainingExerciseUpdated,
    });
  };

  const updateMuscleExercise = (muscleUpdated: string): void => {
    const exerciseActive = trainingHook.exerciseActive;

    if (exerciseActive) {
      let musclesList = toggleMuscleExercise(exerciseActive, muscleUpdated);

      const updatedExercise: ExerciseModel = {
        ...exerciseActive,
        muscles: musclesList,
      };

      void updateData(updatedExercise);
    }
  };

  const handlePressMuscleChip = (muscleUpdated: string) => {
    updateMuscleExercise(muscleUpdated);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} px={"6"}>
      <Modal.Content borderRadius={22} width={"full"}>
        <Modal.CloseButton
          _icon={{
            color: "lightBlue.100",
            size: "xl",
          }}
          _pressed={{
            backgroundColor: "transparent",
          }}
        />

        <Modal.Body
          pb={"4"}
          background={{
            linearGradient: {
              colors: [theme.colors.lightBlue[100], theme.colors.lightBlue[600]],
              start: [2, 0],
              end: [0, 1],
            },
          }}
          style={{
            display: "flex",
            gap: 16,
          }}
        >
          <Text fontSize={"xl"} color={"lightBlue.100"} mt={"1"}>
            Principais músculos
          </Text>

          {muscleGroups.map((muscleGroupItem) => {
            return (
              <VStack key={muscleGroupItem.groupName} space={"0.5"}>
                <Text color={"lightBlue.100"} fontSize={"sm"}>
                  {muscleGroupItem.groupName}
                </Text>

                <HStack
                  space={"2"}
                  flexWrap={"wrap"}
                  style={{
                    rowGap: 8,
                  }}
                >
                  {muscleGroupItem.mainMuscles.map((mainMuscleItem) => {
                    return (
                      <Chip
                        key={mainMuscleItem}
                        active={
                          trainingHook.exerciseActive?.muscles.includes(mainMuscleItem)
                            ? true
                            : false
                        }
                        text={mainMuscleItem}
                        onPress={() => handlePressMuscleChip(mainMuscleItem)}
                      />
                    );
                  })}
                </HStack>
              </VStack>
            );
          })}
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};
