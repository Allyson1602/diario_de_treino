import { Badge, Box, HStack, Text, TextArea, useTheme, VStack } from "native-base";
import { FunctionComponent } from "react";
import { CustomAnimated } from "../components/ui/CustomAnimated";
import { VerticalNumberInput } from "../components/VerticalNumberInput";
import { ExerciseTimer } from "../components/ExerciseTimer";
import { ExerciseNavigation } from "../components/ExerciseNavigation";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";

export const Workout: FunctionComponent = () => {
  const theme = useTheme();

  return (
    <Box
      position={"relative"}
      flex={"1"}
      background={{
        linearGradient: {
          colors: ["#FFACBA", "#EEEEEE"],
          start: [2, 0],
          end: [0, 1],
        },
      }}
    >
      <VStack flex={"1"} justifyContent={"space-between"} alignItems={"center"} pt={"6"} pb={"2"}>
        <VStack space={"1"} alignItems={"center"} px={"6"}>
          <Text fontSize={"md"} color={"text.900"} fontWeight={"medium"}>
            Anotações
          </Text>

          <Box pr={"8"}>
            <TextArea
              autoCompleteType={true}
              placeholder="Digite aqui suas anotações..."
              w={"full"}
              size={"md"}
              textAlign={"center"}
              variant={"unstyled"}
            />
          </Box>
        </VStack>

        <VStack space={"1"} alignItems={"center"}>
          <Text fontSize={"md"} color={"text.900"} fontWeight={"medium"}>
            Repetições
          </Text>
          <HStack alignItems={"center"} space={"2"}>
            <VerticalNumberInput />
            <Text fontSize={"lg"} color={"text.900"} fontWeight={"medium"}>
              de
            </Text>
            <VerticalNumberInput />
          </HStack>
        </VStack>

        <VStack space={"1"}>
          <Text fontSize={"md"} color={"text.900"} fontWeight={"medium"}>
            Carga
          </Text>
        </VStack>

        <VStack>
          <ExerciseTimer onChangeTimerValue={() => {}} onPressTimer={() => {}} timerValue="2:00" />

          <HStack justifyContent={"center"}>
            <ExerciseNavigation onPressLeft={() => {}} onPressRight={() => {}} />
          </HStack>
        </VStack>
      </VStack>

      <VStack position={"absolute"} top={"0"} right={"0"}>
        <CustomAnimated.IconButton
          variant={"unstyled"}
          icon={
            <MaterialCommunityIcons
              name="fire"
              size={45}
              color={true ? theme.colors.primary[500] : theme.colors.muted[400]}
            />
          }
        />

        <Box>
          <Badge
            colorScheme="lightBlue"
            rounded="full"
            mb={"-4"}
            mr={"2"}
            p={"0"}
            w={"6"}
            py={"0.5"}
            zIndex={1}
            variant="solid"
            alignSelf="flex-end"
            _text={{
              fontSize: 12,
            }}
          >
            2
          </Badge>
          <CustomAnimated.IconButton
            variant={"unstyled"}
            icon={<Ionicons name="body-outline" size={35} color={theme.colors.lightBlue[500]} />}
          />
        </Box>
      </VStack>
    </Box>
  );
};
