import moment from "moment";
import { Box, Button, HStack, ScrollView, Text, VStack } from "native-base";
import { FunctionComponent } from "react";
import { Card } from "../components/Card/index";
import { MotivationPhrases } from "../components/MotivationalPhrases";

export const Home: FunctionComponent = () => {
  return (
    <Box
      safeArea
      py={"6"}
      flex={1}
      background={{
        linearGradient: {
          colors: ["#FFACBA", "#EEEEEE"],
          start: [2, 0],
          end: [0, 1],
        },
      }}
    >
      <VStack flex={1}>
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
    </Box>
  );
};
