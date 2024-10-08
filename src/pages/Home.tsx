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
import { FunctionComponent } from "react";
import QRCodePixImage from "../../assets/images/app/qrcode_pix.png";
import { Card } from "../components/Card/index";
import { MotivationPhrases } from "../components/MotivationalPhrases";
import {WeightInput} from "../components/WeightInput";

export const Home: FunctionComponent = () => {
  const theme = useTheme();
  const { isOpen, onClose, onOpen } = useDisclose();

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
        <WeightInput/>
        {/* <VStack flex={1}>
          <Text color={"text.500"} fontSize={"sm"} px={"6"}>
            Seus treinos montados
          </Text>

          <ScrollView
            contentContainerStyle={{
              gap: 8,
              paddingVertical: 8,
              paddingHorizontal: 24,
            }}
            showsVerticalScrollIndicator={false}
          >
            <Card.Container onPress={() => {}}>
              <VStack flexGrow={1} space={"4"}>
                <HStack justifyContent={"space-between"} space={"4"}>
                  <Card.Title text="Poder Total" />

                  <Card.LastTrainingDate
                    lastTraining={moment("01/01/2024", "DD/MM/YYYY")}
                  />
                </HStack>

                <Card.MuscleChips muscleNames={["tríceps", "peito", "ombro"]} />
              </VStack>
            </Card.Container>
          </ScrollView>
        </VStack>

        <VStack space={"5"}>
          <VStack space={"10"} pt={"4"} px={"6"}>
            <MotivationPhrases />

            <Button
              variant={"outline"}
              _text={{
                color: "rose.600",
                fontWeight: "medium",
              }}
              borderColor={"rose.600"}
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
        </VStack> */}
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
              <Text
                color={"white"}
                fontWeight={"bold"}
                textAlign={"center"}
                fontSize={"lg"}
              >
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
                <Image
                  source={QRCodePixImage}
                  width={"150"}
                  height={"150"}
                  alt="qrcode pix"
                />
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
