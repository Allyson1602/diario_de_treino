import moment from "moment";
import { Box, Button, ScrollView, Text, VStack } from "native-base";
import { FunctionComponent } from "react";
import { Card } from "../components/Card";

export const Home: FunctionComponent = () => {
  const motivationMessage =
    "Faça hoje o que outros não querem, viva amanhã como outros não podem.";

  return (
    <Box
      safeArea
      p={"6"}
      flex={1}
      background={{
        linearGradient: {
          colors: ["#FFACBA", "#EEEEEE"],
          start: [2, 0],
          end: [0, 1],
        },
      }}
    >
      <VStack space={"2"} flex={1}>
        <Text color={"text.500"} fontSize={"sm"}>
          Seus treinos montados
        </Text>

        <ScrollView
          contentContainerStyle={{
            gap: 8,
            padding: 8,
          }}
          showsVerticalScrollIndicator={false}
        >
          <Card
            title="Poder Total"
            count={8}
            date={moment("01/01/2024", "DD/MM/YYYY")}
            muscles={["tríceps", "peito", "ombro"]}
          />

          <Card
            title="Poder Total"
            count={8}
            date={moment("01/01/2024", "DD/MM/YYYY")}
            muscles={["tríceps", "peito", "ombro"]}
          />
        </ScrollView>
      </VStack>

      <VStack space={"10"} pt={"4"}>
        <Text fontWeight={"medium"} textAlign={"center"}>
          {motivationMessage}
        </Text>

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
