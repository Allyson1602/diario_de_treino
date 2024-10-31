import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import moment from "moment";
import {
  Actionsheet,
  Box,
  Button,
  HStack,
  Image,
  Link,
  ScrollView,
  Text,
  useDisclose,
  useTheme,
  VStack,
} from "native-base";
import { FunctionComponent, useCallback, useState } from "react";
import QRCodePixImage from "../../assets/images/app/qrcode_pix.png";
import { Card } from "../components/Card/index";
import { MotivationPhrases } from "../components/MotivationalPhrases";
import { getAllMuscleTraining } from "../helpers/getAllMuscleTraining";
import { useTraining } from "../hooks/useTraining";
import { TrainingModel } from "../models/training.model";
import { RootStackParamList } from "../navigation";

type HomeProps = NativeStackScreenProps<RootStackParamList, "Home", "RootStack">;

export const Home: FunctionComponent<HomeProps> = ({ navigation }) => {
  const theme = useTheme();
  const trainingHook = useTraining();
  const { isOpen, onClose, onOpen } = useDisclose();

  const [trainingsData, setTrainingsData] = useState<TrainingModel[]>([]);

  const listTrainingsByStorage = async () => {
    const trainingsStorage = (await trainingHook.getData()) || [];

    setTrainingsData(trainingsStorage);
  };

  const createTraining = async () => {
    const newTraining = await trainingHook.createTraining();
    const trainingList = await trainingHook.getData();

    trainingHook.setTrainingActive(newTraining);
    trainingHook.setData([...trainingList, newTraining]);
  };

  const createExercise = (): void => {
    const newExercise = trainingHook.createExercise();
    trainingHook.setExerciseActive(newExercise);
  };

  const handlePressNewWorkout = () => {
    void createTraining();
    void createExercise();

    navigation.navigate("Workout");
  };

  const handlePressTrainingItem = (trainingItem: TrainingModel) => {
    trainingHook.setTrainingActive(trainingItem);
    navigation.navigate("Training");
  };

  useFocusEffect(
    useCallback(() => {
      listTrainingsByStorage();
    }, []),
  );

  return (
    <>
      <Box
        safeArea
        pt={"6"}
        flex={1}
        background={{
          linearGradient: {
            colors: ["#FFACBA", "#EEEEEE"],
            start: [2, 0],
            end: [0, 1],
          },
        }}
      >
        <VStack flex={1} mb={"4"}>
          <Text color={"text.500"} fontWeight={"medium"} px={"6"}>
            Treinos
          </Text>

          {trainingsData.length > 0 ? (
            <ScrollView
              contentContainerStyle={{
                gap: 8,
                paddingVertical: 8,
                paddingHorizontal: 24,
              }}
              showsVerticalScrollIndicator={false}
            >
              {trainingsData.map((trainingItem) => (
                <Card.Container
                  key={trainingItem.id}
                  onPress={() => handlePressTrainingItem(trainingItem)}
                >
                  <VStack flexGrow={1} space={"4"}>
                    <HStack justifyContent={"space-between"} space={"4"}>
                      <Card.Title text={trainingItem.name} />

                      <Card.LastTrainingDate
                        lastTraining={moment(trainingItem.createdDate, "MM-DD-YYYY")}
                      />
                    </HStack>

                    <Card.MuscleChips muscleNames={getAllMuscleTraining(trainingItem.exercises)} />
                  </VStack>
                </Card.Container>
              ))}
            </ScrollView>
          ) : (
            <Text
              textAlign={"center"}
              pt={"6"}
              fontWeight={"light"}
              fontSize={"md"}
              color={"text.500"}
            >
              Para iniciar, clique em <Text fontWeight={"black"}>Novo Treino</Text>
            </Text>
          )}
        </VStack>

        <VStack space={"5"}>
          <VStack space={"10"} pt={"4"} px={"6"}>
            <MotivationPhrases />

            <Button
              variant={"solid"}
              _text={{
                fontWeight: "medium",
              }}
              onPress={handlePressNewWorkout}
            >
              Novo treino
            </Button>
          </VStack>

          <Button
            onPress={onOpen}
            w={"full"}
            bgColor={"purple.500"}
            rounded={"none"}
            p={"0.5"}
            size={"md"}
          >
            Apoie nosso projeto
          </Button>
        </VStack>
      </Box>

      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content
          backgroundColor={"purple.500"}
          _dragIndicator={{
            style: {
              backgroundColor: theme.colors.purple[200],
            },
          }}
        >
          <VStack space={"8"}>
            <VStack space={"2"} px={"2"}>
              <Text color={"white"} fontWeight={"bold"} textAlign={"center"} fontSize={"lg"}>
                Com seu apoio, podemos continuar inovando!
              </Text>
              <Text color={"white"} textAlign={"center"} fontSize={"md"}>
                Obrigado por acreditar no nosso app e fazer parte dessa jornada!
              </Text>
            </VStack>

            <VStack space={"1"} alignItems={"center"}>
              <Text color={"purple.200"} fontWeight={"medium"}>
                Doe qualquer valor via Pix
              </Text>
              <Box bgColor={"white"} padding={"3"} borderRadius={"xl"}>
                <Image source={QRCodePixImage} width={"150"} height={"150"} alt="qrcode pix" />
              </Box>
              <Link
                href="https://nubank.com.br/cobrar/1etqjh/66fe9de3-e156-4c2e-b2ba-7e5565e5a69b"
                isExternal
                _text={{
                  color: "lightBlue.300",
                  fontWeight: "medium",
                }}
                pt={"2"}
                isUnderlined={false}
              >
                Clique aqui para abrir mais opções
              </Link>
            </VStack>
          </VStack>
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
};
