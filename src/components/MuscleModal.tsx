import { useFocusEffect } from "@react-navigation/native";
import { HStack, Modal, Text, useTheme, VStack } from "native-base";
import { FunctionComponent, useCallback, useState } from "react";
import { muscleGroups } from "../data/muscleGroups";
import { useTraining } from "../hooks/useTraining";
import { ExerciseModel } from "../models/exercise.model";
import { Chip } from "./Chip";
import { useRecoilState } from "recoil";
import { trainingActiveState } from "../contexts/recoil/trainingActiveState";
import { exerciseActiveState } from "../contexts/recoil/exerciseActiveState";

interface IMuscleModal {
  isOpen: boolean;
  onClose: () => void;
}

export const MuscleModal: FunctionComponent<IMuscleModal> = ({ isOpen, onClose }) => {
  const theme = useTheme();
  const trainingHook = useTraining();

  const [musclesSelected, setMusclesSelected] = useState<string[]>([]);
  const [trainingActive, setTrainingActive] = useRecoilState(trainingActiveState);
  const [exerciseActive, setExerciseActive] = useRecoilState(exerciseActiveState);

  const checkMuscle = (musclesList: string[], muscleUpdated: string) => {
    return musclesList.some((muscleItem) => muscleItem === muscleUpdated);
  };

  const toggleMuscleExercise = (muscleUpdated: string): string[] => {
    let musclesList = [...musclesSelected];

    const hasMuscle = checkMuscle(musclesList, muscleUpdated);

    if (hasMuscle) {
      musclesList = musclesList.filter((muscleItem) => muscleItem !== muscleUpdated);
    } else {
      musclesList.push(muscleUpdated);
    }

    return musclesList;
  };

  const updateStorageData = (exerciseUpdated: ExerciseModel) => {
    let exercisesTraining = trainingActive?.exercises || [];

    exercisesTraining = exercisesTraining.map((exerciseItem) => {
      if (exerciseItem.id === exerciseUpdated.id) {
        return exerciseUpdated;
      }

      return exerciseItem;
    });

    setTrainingActive({
      ...trainingActive!,
      exercises: exercisesTraining,
    });

    trainingHook.updateStorageData({
      ...trainingActive!,
      exercises: exercisesTraining,
    });
  };

  const updateMuscleExercise = (): void => {
    if (exerciseActive) {
      const updatedExercise: ExerciseModel = {
        ...exerciseActive,
        muscles: musclesSelected,
      };

      void updateStorageData(updatedExercise);

      setExerciseActive((oldExerciseActive) => {
        if (!oldExerciseActive) return null;

        return {
          ...oldExerciseActive,
          muscles: musclesSelected,
        };
      });
    }
  };

  const handleCloseModal = () => {
    onClose();

    updateMuscleExercise();
  };

  const handlePressMuscleChip = (muscleUpdated: string) => {
    setMusclesSelected(toggleMuscleExercise(muscleUpdated));
  };

  useFocusEffect(
    useCallback(() => {
      setMusclesSelected(exerciseActive?.muscles || []);
    }, [exerciseActive?.muscles]),
  );

  return (
    <Modal isOpen={isOpen} onClose={handleCloseModal} px={"6"}>
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
                        isActive={musclesSelected.includes(mainMuscleItem) ? true : false}
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
