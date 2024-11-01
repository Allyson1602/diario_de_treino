import Feather from "@expo/vector-icons/Feather";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { useFocusEffect } from "@react-navigation/native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { HStack, Input, Pressable, Text, useTheme } from "native-base";
import { FunctionComponent, useCallback, useRef, useState } from "react";
import { cancelAnimation, useSharedValue, withTiming } from "react-native-reanimated";
import Toast from "react-native-toast-message";
import { useTraining } from "../hooks/useTraining";
import { CustomAnimated } from "./ui/CustomAnimated";

const DEFAULT_TRAINING_NAME = "Nome do treino";

export const HeaderTraining: FunctionComponent<NativeStackHeaderProps> = (props) => {
  const trainingNameInputRef = useRef<HTMLInputElement>(null);
  const theme = useTheme();
  const trainingHook = useTraining();
  const scale = useSharedValue(1);

  const [isActive, setIsActive] = useState(false);
  const [trainingNameValue, setTrainingNameValue] = useState(
    trainingHook.trainingActive?.name || DEFAULT_TRAINING_NAME,
  );

  const defineGoBackAnimationOnPress = () => {
    cancelAnimation(scale);

    scale.value = withTiming(0.9, { duration: 200 }, () => {
      scale.value = withTiming(1, { duration: 200 });
    });
  };

  const hasTrainingName = async (newTrainingName: string) => {
    const trainingsList = await trainingHook.getStorageData();

    return trainingsList.some((trainingItem) => trainingItem.name === newTrainingName);
  };

  const handleGoBack = () => {
    defineGoBackAnimationOnPress();
    props.navigation.navigate("Home");
  };

  const handlePressText = () => {
    setIsActive(true);
  };

  const handleBlurInput = async () => {
    setIsActive(false);

    const existTrainingName = await hasTrainingName(trainingNameValue);

    if (existTrainingName) {
      const recoverLastName = trainingHook.trainingActive!.name;
      setTrainingNameValue(recoverLastName);
      setIsActive(true);

      Toast.show({
        type: "error",
        text1: "Treino 💪",
        text2: "Esse nome já existe, informe outro.",
        position: "bottom",
      });
      return;
    }

    trainingHook.setTrainingActive({
      ...trainingHook.trainingActive!,
      name: trainingNameValue,
    });

    trainingHook.updateStorageData({
      ...trainingHook.trainingActive!,
      name: trainingNameValue,
    });
  };

  const handleChangeText = (text: string) => {
    setTrainingNameValue(text);
  };

  useFocusEffect(
    useCallback(() => {
      if (isActive) {
        trainingNameInputRef.current?.focus();
      }
    }, [isActive]),
  );

  return (
    <HStack safeArea p={"4"} alignItems={"center"}>
      <CustomAnimated.IconButton
        icon={<SimpleLineIcons name="arrow-left" size={22} color="black" />}
        onPress={handleGoBack}
        rounded={"full"}
        style={{ transform: [{ scale }] }}
        variant={"unstyled"}
      />

      <HStack flex={"1"} justifyContent={"center"} pr={"22"}>
        {isActive ? (
          <Input
            selectTextOnFocus
            value={trainingNameValue}
            flex={"1"}
            alignSelf={"center"}
            textAlign={"center"}
            variant={"unstyled"}
            fontSize={"lg"}
            py={"0"}
            selectionColor={theme.colors.blue[400]}
            onBlur={handleBlurInput}
            onChangeText={handleChangeText}
            ref={trainingNameInputRef}
            InputRightElement={
              <Feather
                name="edit-3"
                size={18}
                color="black"
                style={{ opacity: 0, paddingLeft: 8 }}
              />
            }
            _focus={{
              _android: {
                selectionColor: theme.colors.blue[400],
              },
            }}
          />
        ) : (
          <Pressable flex={"1"} onPress={handlePressText}>
            <HStack space={"2"} flex={"1"} justifyContent={"center"} alignItems={"center"}>
              <Text textAlign={"center"} fontSize={"lg"}>
                {trainingNameValue}
              </Text>
              <Feather name="edit-3" size={18} color="black" />
            </HStack>
          </Pressable>
        )}
      </HStack>
    </HStack>
  );
};
