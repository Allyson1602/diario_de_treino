import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import moment from "moment";
import { Button, Modal, Text, useTheme, VStack } from "native-base";
import { FunctionComponent } from "react";
import { useTraining } from "../hooks/useTraining";
import { TrainingModel } from "../models/training.model";
import { RootStackParamList } from "../navigation";

interface IFinishTrainingModal {
  isOpen: boolean;
  onClose: () => void;
}

export const FinishTrainingModal: FunctionComponent<IFinishTrainingModal> = ({
  isOpen,
  onClose,
}) => {
  const theme = useTheme();
  const trainingHook = useTraining();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const updateLastTraining = () => {
    const trainingActive = trainingHook.trainingActive;

    if (trainingActive) {
      trainingActive.lastTraining = moment().format();

      trainingHook.updateStorageData({ ...trainingActive });
    }
  };

  const handlePressFinished = () => {
    trainingHook.setExerciseActive(null);
    trainingHook.setTrainingActive(null);
    void updateLastTraining();

    navigation.navigate("Home");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} px={"6"}>
      <Modal.Content borderRadius={22} width={"full"}>
        <Modal.CloseButton
          _icon={{
            color: "rose.100",
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
              colors: [theme.colors.rose[100], theme.colors.rose[600]],
              start: [2, 0],
              end: [0, 1],
            },
          }}
          style={{
            display: "flex",
            gap: 16,
          }}
        >
          <VStack space={"32"} pt={"10"}>
            <VStack space={"2"} alignItems={"center"}>
              <MaterialCommunityIcons name="fire" size={120} color={theme.colors.rose[200]} />
              <Text fontSize={"xl"} color={"rose.200"} mt={"1"}>
                Concluir treino?
              </Text>
            </VStack>

            <Button
              size={"lg"}
              bgColor={"rose.400"}
              _text={{
                fontSize: "lg",
              }}
              onPress={handlePressFinished}
            >
              Já terminei
            </Button>
          </VStack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};
