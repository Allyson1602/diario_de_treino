import Feather from "@expo/vector-icons/Feather";
import { useFocusEffect } from "@react-navigation/native";
import { Icon, Text } from "native-base";
import { FunctionComponent, useCallback, useState } from "react";
import {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { motivationPhrases } from "../data/motivationPhrases";
import { CustomAnimated } from "./ui/CustomAnimated";

export const MotivationPhrases: FunctionComponent = () => {
  const scale = useSharedValue(1);
  const rotate = useSharedValue(0);

  const [randomPhrase, setRandomPhrase] = useState("");

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotate.value}deg` }],
    };
  });

  const getRandomPhrase = () => {
    let randomIndexPhrase = Math.random() * motivationPhrases.length;
    randomIndexPhrase = Math.floor(randomIndexPhrase);

    return motivationPhrases[randomIndexPhrase - 1];
  };

  const defineRandomPhrase = () => {
    setRandomPhrase(getRandomPhrase());
  };

  const defineAnimationOnPress = () => {
    cancelAnimation(scale);
    cancelAnimation(rotate);

    scale.value = withTiming(0.9, { duration: 200 }, () => {
      scale.value = withTiming(1, { duration: 200 });
    });

    rotate.value = withTiming(360, { duration: 700 }, () => {
      rotate.value = 0;
    });
  };

  const handlePressPhrase = () => {
    defineAnimationOnPress();
    defineRandomPhrase();
  };

  useFocusEffect(
    useCallback(() => {
      defineRandomPhrase();
    }, [])
  );

  return (
    <CustomAnimated.Pressable
      onPress={handlePressPhrase}
      position={"relative"}
      justifyContent={"center"}
      alignItems={"center"}
      style={{ transform: [{ scale }] }}
    >
      <Text textAlign={"center"} fontWeight={"medium"}>
        {randomPhrase}
      </Text>

      <CustomAnimated.Box
        position={"absolute"}
        top={"-24"}
        style={animatedStyle}
      >
        <Icon
          as={Feather}
          name="refresh-cw"
          size={"4xl"}
          color="primary.500:alpha.40"
        />
      </CustomAnimated.Box>
    </CustomAnimated.Pressable>
  );
};
