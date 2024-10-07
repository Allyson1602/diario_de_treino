import { FunctionComponent } from "react";
import { Box, Modal, useDisclose, VStack } from "native-base";
import { Text } from "react-native";
import { muscleGroups } from "../data/muscleGroups";

export const MuscleModal: FunctionComponent = () => {
  const { isOpen, onOpen, onClose } = useDisclose();

  return (
    <Modal
      isOpen={true} // isOpen
      onClose={onClose}
    >
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />

        <Modal.Body>
          <Text>Principais músculos</Text>

          {muscleGroups.map((muscleGroupItem) => {
            return (
              <VStack key={muscleGroupItem.groupName}>
                <Text>{muscleGroupItem.groupName}</Text>

                <Box>
                  {muscleGroupItem.mainMuscles.map((mainMuscleItem) => {
                    return <Text key={mainMuscleItem}>{mainMuscleItem}</Text>;
                  })}
                </Box>
              </VStack>
            );
          })}
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};
